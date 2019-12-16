using System.ComponentModel.DataAnnotations;

namespace Model.DataTransfer
{
    public class AppConfigurationDto
    {
        [Key]
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
