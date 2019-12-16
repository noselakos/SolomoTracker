using System;

namespace Model.Exceptions
{
    public class GeolocationNotFoundException : Exception
    {
        public GeolocationNotFoundException(string message) : base(message)
        {
        }
    }
}
