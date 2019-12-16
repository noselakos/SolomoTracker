using System;
using System.Net;
using System.Web.Http;
using Model.Services;
using Model.Services.Interfaces;
using Model.Exceptions;
using Model.DataTransfer;

namespace SofomoTracker.Controllers.Api
{
    [RoutePrefix("Api/Geolocation")]
    public class GeolocationApiController : ApiController
    {
        private readonly IGeolocationApiService _geolocationApiService;
        private readonly IGeolocationService _geolocationService;

        public GeolocationApiController(IGeolocationApiService geolocationApiService, IGeolocationService geolocationService)
        {
            _geolocationApiService = geolocationApiService;
            _geolocationService = geolocationService;
        }

        public GeolocationApiController() : this(new GeolocationApiService(), new GeolocationService())
        {
        }

        [HttpPost, Route(nameof(InsertGeolocationFromApi))]
        public IHttpActionResult InsertGeolocationFromApi([FromBody] InsertGeolocationQuery query)
        {
            return ProcessRequestOrCatch(() => {
                var geolocationDomain = _geolocationApiService.GetGeolocationByIpOrUrl(query.IpUrlQuery).Result;
                var geolocationDto = geolocationDomain.FromDomain();
                var geoId = _geolocationService.InsertGeolocation(geolocationDto);
                geolocationDto.GeolocationId = geoId;
                return Json(geolocationDto);
            });
        }

        [HttpPost, Route(nameof(DeleteGeolocation))]
        public IHttpActionResult DeleteGeolocation([FromBody] DeleteGeolocationQuery query)
        {
            return ProcessRequestOrCatch(() => {
                _geolocationService.DeleteGeolocation(query.GeolocationId);
                return Json(new { Success = true } );
            });
        }

        [HttpGet, Route(nameof(GetGeolocationData))]
        public IHttpActionResult GetGeolocationData()
        {
            return ProcessRequestOrCatch(() => {
                var geoData = _geolocationService.GetAllGeolocationDtos();
                return Json(geoData);
            });
        }

        private IHttpActionResult ErrorMessageResultFactory(HttpStatusCode code, Exception ex, string prefix = null)
        {
            if (prefix == null)
            {
                prefix = "Process failed due to following error: ";
            }
            var message = $"{prefix}{ex.Message}";
            switch (code)
            {
                case HttpStatusCode.BadRequest:
                    return BadRequest(message);
                case HttpStatusCode.InternalServerError:
                    return InternalServerError(ex);
                default:
                    return Content(code, message);     
            }
        }

        private IHttpActionResult ProcessRequestOrCatch(Func<IHttpActionResult> func)
        {
            try
            {
                return func.Invoke();
            }
            catch(AggregateException ex)
            {
                var flattenEx = ex.Flatten();
                if (flattenEx.InnerExceptions.Count == 1 && flattenEx.InnerExceptions[0] is GeolocationNotFoundException)
                {
                    var prefix = "Getting geolocation data did not succeed due to following error: ";
                    return ErrorMessageResultFactory(HttpStatusCode.BadRequest, flattenEx.InnerExceptions[0], prefix);
                }
                return ErrorMessageResultFactory(HttpStatusCode.InternalServerError, flattenEx);
            }
            catch (Exception ex)
            {
                return ErrorMessageResultFactory(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
