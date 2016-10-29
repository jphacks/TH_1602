using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Tarusho.Server.Models.AccountViewModels
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [StringLength(20, MinimumLength = 3)]
        [RegularExpression("^[A-Za-z0-9_]+$", ErrorMessage = "英数字のみ使えます。")]
        [Remote("IsUserNameAvailable", "Account", ErrorMessage = "既に使われています。")]
        [Display(Name = "ユーザー名")]
        public string UserName { get; set; }
    }
}
