using Newtonsoft.Json;
using NoteAPI.Classes.Connections;
using System.IO;

namespace NotesAPI.Classes.Connections
{
    public class Settings
    {
        public static bool IsLoaded { get; set; }
        public static string Connection { get; set; }

        static readonly string file = "ConnectionSettings.json";
        static ConnectionSetting settings = new ConnectionSetting();

        public static void Load()
        {
            using (StreamReader reader = new StreamReader(file))
            {
                string json = reader.ReadToEnd();
                settings = JsonConvert.DeserializeObject<ConnectionSetting>(json);

                IsLoaded = true;
                Connection = $"server={settings.Ip};user={settings.User};password={settings.Password};database={settings.Database};ConvertZeroDateTime=True;";
            }
        }

        public static void Create()
        {
            string json = JsonConvert.SerializeObject(settings, Formatting.Indented);
            File.WriteAllText(file, json);
        }

        public static string getEmailAccount()
        {
            return settings.Account;
        }

        public static string getName() 
        {
            return settings.Name;
        }

        public static string getEmailPassword()
        {
            return settings.Creds;
        }

        public static string GetFileName()
        {
            return file;
        }
    }
}