using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NoteAPI.Classes;
using NoteAPI.Scaffolding;
using System.Web.Http.Cors;

namespace NoteAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [ApiController]
    public class SignupController : Controller
    {
        [HttpPost]
        public string Post([FromBody] SignupRequest signup)
        {
            CSC425Context db = new CSC425Context();
            var apikey = Request.Query["api_key"].ToString();
            var remoteIPAddress = HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString();

            if (apikey.ToLower() != Security.APIKey)
            {
                return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", "Bad API Key"));
            }

            return signup.Signup(db, remoteIPAddress);
        }
    }
}
