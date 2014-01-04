using System;
using System.Net;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace WPCordovaClassLib.Cordova.Commands
{
    public class BinaryBridge : BaseCommand
    {
        [DataContract]
        public class BridgeOptions
        {
            [DataMember]
            public string url;
        }

        public async void readStreamAsync(string options)
        {
            try
            {
                BridgeOptions opts = WPCordovaClassLib.Cordova.JSON.JsonHelper.Deserialize<BridgeOptions>(options);

                if (opts == null || string.IsNullOrEmpty(opts.url))
                {
                    this.DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR));
                }

                string base64 = await DownloadImageAsync(opts.url);
                if (!string.IsNullOrEmpty(base64))
                {
                    this.DispatchCommandResult(new PluginResult(PluginResult.Status.OK, base64));
                }
                else
                {
                    this.DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR));
                }
            }
            catch
            {
                this.DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR));
            }
        }

        private Task<string> DownloadImageAsync(string url)
        {
            HttpWebRequest req = (HttpWebRequest)HttpWebRequest.Create(url);
            Task<WebResponse> requestTask = Task.Factory.FromAsync(
                req.BeginGetResponse, result => req.EndGetResponse(result),
                TaskCreationOptions.None);

            Task<string> resultTask = requestTask.ContinueWith(responseTask =>
            {
                using (
                    var stream =
                        responseTask.Result.GetResponseStream())
                {
                    int len = (int)stream.Length;
                    byte[] byt = new Byte[len];
                    stream.Read(byt, 0, len);
                    var b64 = System.Convert.ToBase64String(byt);
                    return b64;
                }
            });

            return resultTask;
        }
    }
}
