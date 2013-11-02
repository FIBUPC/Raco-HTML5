using Microsoft.Phone.Controls;
using System;
using System.ComponentModel;
using WPCordovaClassLib;

namespace RacoMobile.Helpers
{
    /// <summary>
    /// Back-button handler for hash navigation based web applications. When back-button
    /// is pressed, the browser history is navigated if not empty. Otherwise, a normal back is done.
    /// </summary>
    public class BackButtonHandler
    {
        private WebBrowser _browser;
        private DateTime _lastBack;
        private PhoneApplicationPage _page;

        /// <summary>
        /// Creates a new back-button handler
        /// </summary>
        /// <param name="page">Page in which the back-button handler will be applied</param>
        /// <param name="browser">Browser from which we want to control the history</param>
        public BackButtonHandler(PhoneApplicationPage page, WebBrowser browser)
        {
            _page = page;

            _lastBack = DateTime.Now;

            _browser = browser;

            page.BackKeyPress += OnBackButtonPressed;
        }

        private static volatile object _padlock = new object();

        /// <summary>
        /// Handles the hardware back-button press event
        /// </summary>
        private void OnBackButtonPressed(object sender, CancelEventArgs e)
        {
            lock (_padlock)
            {
                //If maintenance is showing, go back to panorama
                /*if (CordovaViewModel.Instance.IsMaintenance)
                {
                    e.Cancel = false;
                    return;
                }

                //try to get current hash from JS side
                //since the OriginalString of browser sometimes is not correct
                string currentHashString = "";
                try
                {

                    object currentHash = _browser.InvokeScript("eval", "Utils.location.getCurrentHash()");
                    currentHashString = (string)currentHash;
                }
                catch
                {
                }

                if (DateTime.Now.Subtract(_lastBack).TotalMilliseconds < 500)
                {
                    e.Cancel = true;
                }
                else if (
                            _browser != null 
                            //&& _browser.Source != null 
                            && !string.IsNullOrEmpty(currentHashString)
                            && !CordovaView.StartPageUri.OriginalString.Contains(currentHashString)
                            && !currentHashString.Contains("globalPosition/globalPosition")
                            && currentHashString.Contains("#")
                        )
                {
                    CordovaViewModel.Instance.IsLoading = false;

                    try
                    {
                        _browser.InvokeScript("eval", "history.back();");
                        e.Cancel = true;
                    }
                    catch
                    {
                    }
                }
                else
                {
                    if (_page.NavigationService.CanGoBack)
                    {
                        _page.NavigationService.GoBack();
                    }
                }

                _lastBack = DateTime.Now;*/
            }
        }
    }
}
