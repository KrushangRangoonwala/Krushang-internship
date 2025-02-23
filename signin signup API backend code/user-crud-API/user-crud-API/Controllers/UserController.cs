using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;
using user_crud_API.Services;
using user_crud_API.Models.Requests;
using user_crud_API.Models.Response;
using user_crud_API.Models.DB;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using System.Buffers.Text;

namespace user_crud_API.Controllers
{
    public partial class UserController : Controller
    {
        userCrudApiContext context;
        IMailService mailService;
        public UserController(userCrudApiContext context,IMailService mailService)
        {
            this.context = context;
            this.mailService = mailService;
        }

        public ActionResult Get([FromRoute] int? id)
        {
            if(id == null) return NotFound(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "Id is null"
            });
            Person? person = context.People.Find(id);
            if (person == null)
            {
                return NotFound(new CustomResponse()
                {
                    Code = 404,
                    Success = false,
                    Message = "Record Not Found"
                });
            }
            return Ok(new CustomResponse()
            {
                Code = 200,
                Success = true,
                Message = "Record found",
                Data = person
            });
        }

        [HttpPost]
        public ActionResult Register([FromBody] Person person)
        {

            if (person == null)
            {
                return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "Object Null",
                    Data = person
                });
            }

            if(person.BirthDate == null) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "Date Missing"
            });

            if (person.Password != null) 
            { 
                person.Password = BCrypt.Net.BCrypt.HashPassword(person.Password); 
            }

            try
            {
                EmailVerification? email = context.EmailVerifications.Where(e => e.EmailId == person.EmailId).FirstOrDefault();
                
                if(email == null || email.IsVerified != true)
                {
                    return BadRequest(new CustomResponse()
                    {
                        Code = 400,
                        Success = false,
                        Message = "Email Not Verified",
                        Data = person
                    });
                }
                try
                {
                    email.IsRegistered = true;
                    context.EmailVerifications.Update(email);
                    context.SaveChanges();
                }
                catch
                {
                    return BadRequest(new CustomResponse()
                    {
                        Code = 400,
                        Success = false,
                        Message = "Coudnt update Email Status",
                        Data = person
                    });
                }
                person.Role = "user";
                context.People.Add(person);
                context.SaveChanges();
                IdRole dataToBeSent = new IdRole()
                {
                    Id = person.Id,
                    Role = person.Role
                };
                String Token = JsonConvert.SerializeObject(dataToBeSent);
                Token = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(Token));
                return Ok(new CustomResponse()
                {
                    Code = 200,
                    Success = true,
                    Message = "User Added Successfully",
                    Data = new AuthenticationToken() { Token = Token}
                });

            }
            catch
            {
                if (person.EmailId == null || person.EmailId == "" ||
                    person.Password == null || person.Password == "" ||
                    person.FirstName == null || person.FirstName == "" ||
                    person.LastName == null || person.LastName == "" ||
                    person.ContactNo == null || person.ContactNo == "" ||
                    person.Gender == null || person.Gender == "")
                {
                    
                    return BadRequest(new CustomResponse()
                    {
                        Code = 400,
                        Success = false,
                        Message = "Incomplete Data",
                        Data = person
                    });
                }

                if(person.FirstName.Length > 15) return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "FirstName must be less than 15 characters long"
                });
                if (person.LastName.Length > 15) return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "LastName must be less than 15 characters long"
                });
                if (person.EmailId.Length > 40) return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "Email Id must be less than 40 characters long"
                });
                if (!(person.Gender == "M" || person.Gender == "F")) return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "Gender must be M or F"
                });
                if(person.ContactNo.Length != 10) return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "Contact No must be 10 characters long",
                    Data = person
                });
                return BadRequest(new CustomResponse(){
                    Code = 400,
                    Success = false,
                    Message = "Email Already Exists"
                });
            }
        }

        [HttpPost]
        public ActionResult Login([FromBody] LoginRequest data)
        {
            if(data == null)
            {
                return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "Object Null"
                });
            }
            string? emailId = data.EmailId;
            string? password = data.Password; 

            if(emailId == null || password == null)
            {
                return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "Incomplete Data"
                });
            }

            Person? person = context.People.Where(e => e.EmailId == emailId).FirstOrDefault();
            if (person == null) return Unauthorized(new CustomResponse()
            {
                Code = 401,
                Success = false,
                Message = "Email not Registered"
            });
            else if (BCrypt.Net.BCrypt.Verify(password,person.Password))
            {
                IdRole dataToBeSent = new IdRole()
                {
                    Id = person.Id,
                    Role = person.Role
                };
                String Token = JsonConvert.SerializeObject(dataToBeSent);
                Token = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(Token));
                return Ok(new CustomResponse()
                {
                    Code = 400,
                    Success = true,
                    Message = "Login success",
                    Data = new AuthenticationToken() { Token = Token }
                });
            }
            else return Unauthorized(new CustomResponse()
            {
                Code = 401,
                Success = false,
                Message = "Incorrect Password"
            });
            
        }

        [HttpPost]
        public ActionResult ChangePassword([FromBody] ChangePassRequest data)
        {
            if (data == null)
            {
                return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "Object Null"
                });
            }
            int? Id = data.Id;
            string? oldPassword = data.OldPassword;
            string? newPassword = data.NewPassword;

            if ( Id == null || oldPassword == null || newPassword == null)
            {
                return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "Incomplete Data"
                });
            }
            Person? person = context.People.Find(Id);
            if(person == null)
            {
                return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "Email does not exist in Database"
                });
            }
            else if (BCrypt.Net.BCrypt.Verify(oldPassword, person.Password))
            {
                try
                {
                    person.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
                    context.People.Update(person);
                    context.SaveChanges();
                    return Ok(new CustomResponse()
                    {
                        Code = 200,
                        Success = true,
                        Message = "Password updated"
                    });
                }
                catch
                {
                    return BadRequest(new CustomResponse()
                    {
                        Code = 400,
                        Success = false,
                        Message = "Could not update Password"
                    });
                }
            }
            else
            {
                return Unauthorized(new CustomResponse()
                {
                    Code = 401,
                    Success = false,
                    Message = "Incorrect Old Password"
                });
            }
            

        }

        [HttpPost]
        public ActionResult ForgotPassword([FromBody] Email EmailId)
        {
            if (EmailId == null) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "EmailId is Empty"
            });

            string? emailId = EmailId.EmailId;

            if (emailId == null) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "EmailId is Empty"
            });
            Person? person = context.People.Where(e => e.EmailId == emailId).FirstOrDefault();
            if(person == null) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "Email not Registered"
            });
            else
            {
                Random random = new Random();
                string newPassword = ((char)random.Next(65, 90)).ToString() + ((char)random.Next(65, 90)).ToString() +
                                     ((char)random.Next(97, 122)).ToString() + ((char)random.Next(97, 122)).ToString() +
                                     "@#" + random.Next(1000, 99999999).ToString();
                try
                {
                    string Hashed = BCrypt.Net.BCrypt.HashPassword(newPassword);
                    person.Password = Hashed;
                    context.People.Update(person);
                    context.SaveChanges();
                    bool sent = mailService.SendMail(person.EmailId, "New Password", "New Password : " + newPassword);
                    return Ok(new CustomResponse()
                    {
                        Code = 200,
                        Success = true,
                        Message = "Password sent",
                        Data = newPassword
                    });
                }
                catch
                {
                    return BadRequest(new CustomResponse()
                    {
                        Code = 400,
                        Success = false,
                        Message = "Error Fetching new Password"
                    });
                }
            }

        }
    }
}
