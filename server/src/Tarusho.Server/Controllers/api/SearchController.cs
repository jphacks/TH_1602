using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Tarusho.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/search")]
    [EnableCors("AllowAll")]
    [Authorize]
    public class SearchController : Controller
    {
    }
}