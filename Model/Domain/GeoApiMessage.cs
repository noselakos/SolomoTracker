namespace Model.Domain
{
    public class GeoApiMessage
    {
        public bool Success { get; set; }
        public ErrorDetails Error { get; set; }

        public bool IsPopulated() => Error != null;
    }

    public class ErrorDetails
    {
        public int Code { get; set; }
        public string Type { get; set; }
        public string Info { get; set; }
    }
}
