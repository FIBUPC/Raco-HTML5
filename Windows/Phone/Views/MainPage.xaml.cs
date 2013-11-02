using Microsoft.Phone.Controls;
using RacoMobile.Helpers;

namespace RacoMobile
{
    public partial class MainPage : PhoneApplicationPage
    {
        // Constructor
        public MainPage()
        {
            InitializeComponent();

            new DisableBrowserZoom(this.Browser.Browser);
            new DisableBrowserDoubleTapEffect(this.Browser.Browser);
            new BackButtonHandler(this, this.Browser.Browser);
        }
    }
}