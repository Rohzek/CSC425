using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NoteAPI.Classes;
using NoteAPI.Scaffolding;
using System.Net;
using System.Net.Http;
using System.Web.Http.Cors;

namespace NoteAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [ApiController]
    public class VerifyController : Controller
    {
        [HttpGet]
        public string Get()
        {
            CSC425Context db = new CSC425Context();
            var remoteIPAddress = HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString();

            var secret = Request.Query["verification_code"].ToString();

            if (secret.Length == 0)
            {
                return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", "Verification error. Please contact an administrator."));
            }

            return new VerifyUserRequest(secret).AttemptVerification(db, remoteIPAddress);
        }

        // Response for browser's preflight CORS check
        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}