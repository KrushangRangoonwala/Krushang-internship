using System;
using System.Collections.Generic;

namespace user_crud_API.Models.DB
{
    public partial class Person
    {
        public int Id { get; set; }
        public string? EmailId { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ContactNo { get; set; }
        public DateTime? BirthDate  { get; set; }
        public string? Gender { get; set; }
        public string? Role { get; set; }
        public string? Image { get; set; }
    }
}
