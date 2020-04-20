using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace NoteAPI.Classes
{
    public class Security
    {
        public static string Pepper
        {
            get
            {
                return "mcBiYFQcE5T8DCaQsBdBvwIYmRh90jDsbdwWNIUEmVcZsZ1wHImfCTv0Z2rBCDrHmHkHj8kZAmXWaMGABQVbmOfGPh7fCc5K8IsrExpmmA3LcPaagPS40ScIp9tsy6X6";
            }
        }

        public static string APIKey
        {
            get
            {
                return "6c8s9c5442051f2i6n6a3l";
            }
        }

        static string[] chars = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                         "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                         "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};

        static RNGCryptoServiceProvider random = new RNGCryptoServiceProvider();

        public static string Generate(int size)
        {
            var psRandom = new Random();
            string[] randomizedChars = chars.OrderBy(x => GetNextInt32(random)).ToArray();
            var salt = new StringBuilder();

            for (int i = 0; i < size; i++)
            {
                salt.Append(randomizedChars[psRandom.Next(0, randomizedChars.Length)]);
            }

            return salt.ToString();
        }

        static int GetNextInt32(RNGCryptoServiceProvider random)
        {
            byte[] randomInt = new byte[4];
            random.GetBytes(randomInt);
            return Convert.ToInt32(randomInt[0]);
        }

        public static string SHA256(string input)
        {
            var crypt = new SHA256Managed();
            var output = new StringBuilder();
            byte[] crypto = crypt.ComputeHash(Encoding.UTF8.GetBytes(input));
            foreach (byte abyte in crypto)
            {
                output.Append(abyte.ToString("x2"));
            }
            return output.ToString();
        }
    }
}
