using LinqToVisualTree;
using Microsoft.Phone.Controls;
using System.Linq;
using System.Windows;
using System.Windows.Controls;

namespace RacoMobile.Helpers
{
    /// <summary>
    /// 
    /// </summary>
    public class DisableBrowserDoubleTapEffect
    {
        private WebBrowser _browser;

        public DisableBrowserDoubleTapEffect(WebBrowser browser)
        {
            this._browser = browser;

            this._browser.Loaded += new RoutedEventHandler(Browser_Loaded);
        }

        private void Browser_Loaded(object sender, RoutedEventArgs e)
        {
            var border = _browser.Descendants<Border>().Last() as Border;

            border.DoubleTap += OnDoubleTapped;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void OnDoubleTapped(object sender, System.Windows.Input.GestureEventArgs e)
        {
            e.Handled = true;
        }
    }
}
