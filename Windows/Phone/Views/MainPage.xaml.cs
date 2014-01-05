using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;
using RacoMobile.Helpers;
using System;
using System.ComponentModel;
using System.Windows;
using System.Windows.Navigation;

namespace RacoMobile
{
    public partial class MainPage : PhoneApplicationPage
    {
        public MainPage()
        {
            InitializeComponent();

            this.Loaded += MainPageLoaded;

            new DisableBrowserZoom(this.Browser.Browser);
            new DisableBrowserDoubleTapEffect(this.Browser.Browser);

            this.Browser.Browser.Navigated += OnBrowserNavigated;
        }

        private void MainPageLoaded(object sender, EventArgs e)
        {
            (this.ApplicationBar.Buttons[0] as ApplicationBarIconButton).Text = Localization.AppResources.AppBarRefresh;
            (this.ApplicationBar.Buttons[1] as ApplicationBarIconButton).Text = Localization.AppResources.AppBarMenu;

            (this.ApplicationBar.MenuItems[0] as ApplicationBarMenuItem).Text = Localization.AppResources.AppBarSettings;
            (this.ApplicationBar.MenuItems[1] as ApplicationBarMenuItem).Text = Localization.AppResources.AppBarSignOut;
        }

        private void OnBrowserNavigated(object sender, NavigationEventArgs args)
        {
            string currentUrl = args.Uri.OriginalString;
            if (!string.IsNullOrEmpty(currentUrl) && currentUrl.Contains("#") && !currentUrl.EndsWith("login") && (currentUrl.Split('/').Length < 5) && !currentUrl.EndsWith("settings"))
            {
                // Logged in
                ShowLoggedInControls();
            }
            else
            {
                // Not logged in
                HideLoggedInControls();
            }
        }

        private void ShowLoggedInControls()
        {
            this.ApplicationBar.IsVisible = true;
        }

        private void HideLoggedInControls()
        {
            this.ApplicationBar.IsVisible = false;
        }

        protected override void OnBackKeyPress(CancelEventArgs e)
        {
            var currentUrl = this.Browser.Browser.Source.OriginalString;

            if (!string.IsNullOrEmpty(currentUrl) && ((currentUrl.EndsWith("settings")) || (currentUrl.Split('/').Length > 4)))
            {
                this.Browser.Browser.InvokeScript("eval", "$('#back-button').trigger('click')");

                ShowLoggedInControls();
                e.Cancel = true;
            }
        }

        private void ToggleMenu(object sender, EventArgs e)
        {
            this.Browser.Browser.InvokeScript("eval", "$('#menu-toggle-button').trigger('click')");
        }

        private void Refresh(object sender, EventArgs e)
        {
            this.Browser.Browser.InvokeScript("eval", "$('#refresh-button').trigger('click')");
        }

        private void Settings(object sender, EventArgs e)
        {
            this.Browser.Browser.InvokeScript("eval", "$('#menu #tabs li.settings').trigger('click')");
        }

        private void Logout(object sender, EventArgs e)
        {
            MessageBoxResult result = MessageBox.Show(Localization.AppResources.SignOutMessage, Localization.AppResources.SignOutTitle, MessageBoxButton.OKCancel);

            if (result.Equals(MessageBoxResult.OK))
            {
                this.Browser.Browser.InvokeScript("eval", "$('#menu #tabs li.logout').trigger('click')");
            }
        }

        private void OnDragCompleted(object sender, DragCompletedGestureEventArgs e)
        {
            string currentUrl = this.Browser.Browser.Source.OriginalString;

            if (string.IsNullOrEmpty(currentUrl) || !currentUrl.Contains("#") || currentUrl.Contains("login") || currentUrl.Contains("settings"))
            {
                e.Handled = false;
                return;
            }

            if (e.Direction == System.Windows.Controls.Orientation.Horizontal)
            {
                ToggleMenu(null, null);
            }
        }
    }
}