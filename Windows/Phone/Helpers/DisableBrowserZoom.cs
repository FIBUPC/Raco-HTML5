using LinqToVisualTree;
using Microsoft.Phone.Controls;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace RacoMobile.Helpers
{
    /// <summary>
    /// 
    /// </summary>
    public class DisableBrowserZoom
    {
        private WebBrowser _browser;

        public DisableBrowserZoom(WebBrowser browser)
        {
            this._browser = browser;

            browser.Loaded += new RoutedEventHandler(Browser_Loaded);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Browser_Loaded(object sender, RoutedEventArgs e)
        {
            var border = _browser.Descendants<Border>().Last() as Border;

            border.ManipulationDelta += Border_ManipulationDelta;
            border.ManipulationCompleted += Border_ManipulationCompleted;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Border_ManipulationCompleted(object sender, ManipulationCompletedEventArgs e)
        {
            // Disable snap zoom
            if (e.FinalVelocities != null && (e.FinalVelocities.ExpansionVelocity.X != 0.0 || e.FinalVelocities.ExpansionVelocity.Y != 0.0))
            {
                e.Handled = true;
            }   
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Border_ManipulationDelta(object sender, ManipulationDeltaEventArgs e)
        {
            // Disable zoom
            if ((e.DeltaManipulation != null) && (e.DeltaManipulation.Scale.X != 0.0 || e.DeltaManipulation.Scale.Y != 0.0))
            {
                e.Handled = true;
            }

            /*// Disable scroll
            if (e.DeltaManipulation.Translation.X != 0.0 || e.DeltaManipulation.Translation.Y != 0.0)
            {
                e.Handled = true;
            }*/
        }
    }
}
