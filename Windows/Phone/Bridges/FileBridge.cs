using System;
using System.IO;
using System.Runtime.Serialization;
using System.Windows;
using System.Windows.Resources;

namespace WPCordovaClassLib.Cordova.Commands
{
    public class FileBridge : BaseCommand
    {
        [DataContract]
        public class FileOptions
        {
            [DataMember]
            public string path;
        }

        public void getFileContents(string options)
        {
            try
            {
                FileOptions opts = WPCordovaClassLib.Cordova.JSON.JsonHelper.Deserialize<FileOptions>(options);

                if (!string.IsNullOrEmpty(opts.path))
                {
                    StreamResourceInfo streamInfo = Application.GetResourceStream(new Uri("RacoMobile;component/www/" + opts.path, UriKind.RelativeOrAbsolute));
                    if (null != streamInfo)
                    {
                        using (StreamReader sr = new StreamReader(streamInfo.Stream))
                        {
                            string fileContents = sr.ReadToEnd();
                            sr.Dispose();
                            sr.Close();

                            this.DispatchCommandResult(new PluginResult(PluginResult.Status.OK, fileContents));
                        }
                    }
                }
            }
            catch
            {
                //return error to simulate 404 not found http status code
                this.DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR));
            }
        }
    }
}
