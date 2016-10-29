using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Tarusho.Server.Models.Api
{
    public class UserInfoResponse
    {
        /// <summary>
        /// user name
        /// </summary>
        /// <value>user name</value>
        [DataMember(Name = "user_name", EmitDefaultValue = false)]
        public string UserName { get; set; }
        /// <summary>
        /// 表示名
        /// </summary>
        /// <value>表示名</value>
        [DataMember(Name = "display_name", EmitDefaultValue = false)]
        public string DisplayName { get; set; }
        /// <summary>
        /// プロフィールimage uri
        /// </summary>
        /// <value>プロフィールimage uri</value>
        [DataMember(Name = "profile_image_uri", EmitDefaultValue = false)]
        public string ProfileImageUri { get; set; }

        /// <summary>
        /// プロフィールサムネイル image uri
        /// </summary>
        [DataMember(Name = "profile_thumbnail_image_uri", EmitDefaultValue = false)]
        public string ProfileThumbnailImageUri { get; set; }

    }
}
