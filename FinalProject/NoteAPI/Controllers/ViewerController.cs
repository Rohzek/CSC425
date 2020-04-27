using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NoteAPI.Classes;
using NoteAPI.Classes.Requests;
using NoteAPI.Scaffolding;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http.Cors;

namespace NoteAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [ApiController]
    public class ViewerController : Controller
    {
        [HttpPut]
        public string Put([FromBody] AllowedUserRequest user)
        {
            CSC425Context db = new CSC425Context();
            var apikey = Request.Query["api_key"].ToString();

            if (apikey.ToLower() != Security.APIKey)
            {
                return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", "Bad API Key"));
            }

            return user.AddUser(db);
        }

        [HttpDelete]
        public string Delete()
        {
            CSC425Context db = new CSC425Context();
            var apikey = Request.Query["api_key"].ToString();
            var NoteID = Int32.Parse(Request.Query["noteid"].ToString());
            var Username = Request.Query["username"].ToString();
            AllowedUserRequest user = new AllowedUserRequest(NoteID, Username);

            if (apikey.ToLower() != Security.APIKey)
            {
                return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", "Bad API Key"));
            }

            return user.RemoveUser(db);
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