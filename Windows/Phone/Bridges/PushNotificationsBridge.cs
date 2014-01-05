using Microsoft.Phone.Notification;

namespace WPCordovaClassLib.Cordova.Commands
{
    public class PushNotificationsBridge : BaseCommand
    {
        private const string ChannelName = "RacoMobile";

        public void openChannel(string options)
        {
            try
            {
                HttpNotificationChannel currentChannel = HttpNotificationChannel.Find(ChannelName);

                if (currentChannel == null)
                {
                    currentChannel = new HttpNotificationChannel(ChannelName);
                    currentChannel.Open();
                    currentChannel.BindToShellTile();
                    currentChannel.BindToShellToast();
                }

                this.DispatchCommandResult(new PluginResult(PluginResult.Status.OK, currentChannel.ChannelUri));
            }
            catch
            {
                this.DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR));
            }
        }

        public void closeChannel(string options)
        {
            try
            {
                HttpNotificationChannel currentChannel = HttpNotificationChannel.Find(ChannelName);

                if (currentChannel != null)
                {
                    currentChannel.Close();
                }

                this.DispatchCommandResult(new PluginResult(PluginResult.Status.OK));
            }
            catch
            {
                this.DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR));
            }
        }
    }
}
