﻿using Microsoft.AspNetCore.Http.Features;
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
    public class UserController : Controller
    {
        [HttpPost]
        public string Post([FromBody] UserInfoRequest changes)
        {
            CSC425Context db = new CSC425Context();
            var apikey = Request.Query["api_key"].ToString();
            var remoteIPAddress = HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString();

            if (apikey.ToLower() != Security.APIKey)
            {
                return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", "Bad API Key"));
            }

            return changes.UsernameAndPasswordUpdate(db, remoteIPAddress);
        }

        public HttpResponseMessage Options()
        {
            var response = new HttpResponseMessage();
            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }
}