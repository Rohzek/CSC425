using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NoteAPI.Classes;
using NoteAPI.Classes.Requests;
using NoteAPI.Scaffolding;
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
    }
}