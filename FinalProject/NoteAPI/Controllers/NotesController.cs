using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NoteAPI.Classes;
using NoteAPI.Classes.Requests;
using NoteAPI.Scaffolding;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Cors;

namespace NoteAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [ApiController]
    public class NotesController : Controller
    {

        [HttpGet]
        public string Get() 
        {
            CSC425Context db = new CSC425Context();
            var apikey = Request.Query["api_key"].ToString();
            var username = Request.Query["username"].ToString();
            var search = Request.Query["search"].ToString();

            if (apikey.ToLower() != Security.APIKey)
            {
                return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", "Bad API Key"));
            }

            if (search.Length > 0)
            {
                return NoteRequest.GetNote(db, username, search);
            }

            return NoteRequest.GetNote(db, username);
        }

        [HttpPost]
        public string Post([FromBody] NoteRequest note)
        {
            CSC425Context db = new CSC425Context();
            var apikey = Request.Query["api_key"].ToString();

            if (apikey.ToLower() != Security.APIKey)
            {
                return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", "Bad API Key"));
            }

            return note.AddNote(db);
        }

        [HttpPut]
        public string Put([FromBody] NoteRequest note)
        {
            CSC425Context db = new CSC425Context();
            var apikey = Request.Query["api_key"].ToString();

            if (apikey.ToLower() != Security.APIKey)
            {
                return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", "Bad API Key"));
            }

            return note.UpdateNote(db);
        }

        [HttpDelete]
        public string Delete()
        {
            CSC425Context db = new CSC425Context();
            var apikey = Request.Query["api_key"].ToString();
            var NoteID = Int32.Parse(Request.Query["noteid"].ToString());
            var Username = Request.Query["username"].ToString();
            var note = db.Notes.Where(n => n.NotesId.Equals(NoteID)).FirstOrDefault();
            var user = db.Users.Where(u => u.Username.ToLower().Equals(Username.ToLower())).FirstOrDefault();

            if (note == null) 
            {
                return JsonConvert.SerializeObject(new ReturnCode(404, "Not Found", "That note doesn't exist."));
            }

            if (!note.UserId.Equals(user.UserId)) 
            {
                return JsonConvert.SerializeObject(new ReturnCode(403, "Forbidden", "That note doesn't belong to you."));
            }

            var req = new NoteRequest(db, note, user);

            if (apikey.ToLower() != Security.APIKey)
            {
                return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", "Bad API Key"));
            }

            return req.DeleteNote(db);
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