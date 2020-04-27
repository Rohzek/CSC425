namespace NoteAPI.Classes
{
    public class ReturnCode
    {
        public int Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ReturnCode(int code, string name, string description)
        {
            Code = code;
            Name = name;
            Description = description;
        }
    }
}
