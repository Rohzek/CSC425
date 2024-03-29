﻿namespace NoteAPI.Classes.Connections
{
    public class ConnectionSetting
    {
        public string Ip { get; set; }
        public string Port { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string Database { get; set; }
        public string Account { get; set; }
        public string Name { get; set; }
        public string Creds { get; set; }

        public ConnectionSetting()
        {
            Ip = "127.0.0.1";
            Port = "3306";
            User = "root";
            Password = "password";
            Database = "name";
            Account = "name@domain.ext";
            Name = "John Doe";
            Creds = "nopass";
        }
    }
}