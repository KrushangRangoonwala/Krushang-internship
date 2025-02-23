using System;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Mvc;
using user_crud_API.Models.DB;
using user_crud_API.Models.Requests;
using user_crud_API.Models.Response;
namespace user_crud_API.Controllers
{
    public partial class UserController
    {
        [HttpPost]
        public ActionResult VerifyEmail([FromBody] Email EmailId)
        {
            Random random = new Random();
            string Otp = random.Next(100000, 999999).ToString();

            if(EmailId == null) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "EmailId is Empty"
            });

            string? emailId = EmailId.EmailId;

            if (emailId != null)
            {
                if (emailId.Length > 40) return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "Email must be less than 40 characters long"
                });

                EmailVerification? email = context.EmailVerifications.Where(e => e.EmailId == emailId).FirstOrDefault();
                if (email == null)
                {
                    try{
                        EmailVerification newEmail = new EmailVerification() { EmailId = emailId, Otp = Otp };
                        context.EmailVerifications.Add(newEmail);
                        context.SaveChanges();
                        bool sent = mailService.SendMail(emailId, "OTP", "OTP : " + newEmail.Otp);
                        return Ok(new CustomResponse()
                        {
                            Code = 200,
                            Success = true,
                            Message = "OTP sent",
                            Data = newEmail.Otp
                        });
                    }
                    catch
                    {
                        return BadRequest(new CustomResponse()
                        {
                            Code = 400,
                            Success = false,
                            Message = "Database Exception"
                        });
                    }
                }
                else
                {
                    if (email.IsRegistered == true)
                    {
                        return BadRequest(new CustomResponse()
                        {
                            Code = 400,
                            Success = false,
                            Message = "Email Already Registered"
                        });
                    }
                    else if (email.IsVerified == true)
                    {
                        return BadRequest(new CustomResponse()
                        {
                            Code = 400,
                            Success = false,
                            Message = "Email Already Verified"
                        });
                    }
                    else
                    {
                        try
                        {
                            email.Otp = Otp;
                            context.EmailVerifications.Update(email);
                            context.SaveChanges();
                            bool sent = mailService.SendMail(emailId, "OTP", "OTP : " + email.Otp);
                            return Ok(new CustomResponse()
                            {
                                Code = 200,
                                Success = true,
                                Message = "New OTP sent",
                                Data = email.Otp
                            });
                        }
                        catch
                        {
                            return BadRequest(new CustomResponse()
                            {
                                Code = 400,
                                Success = false,
                                Message = "Database Exception"
                            });
                        }
                    }
                }
            }
            else
            {
                return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "EmailId is Empty"
                });
            }
            
        }
        
        public ActionResult VerifyOTP([FromBody] EmailVerification data)
        {
            if(data.EmailId == null || data.Otp == null) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "Incomplete Data",
                Data = data
            });
            EmailVerification? emaildata = context.EmailVerifications.Where(e => e.EmailId == data.EmailId).FirstOrDefault();
            if (emaildata == null) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "No active OTP for given Email"
            });
            if (emaildata.IsRegistered == true) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "Email already Registered"
            });
            if (emaildata.IsVerified == true) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "Email Already Verified"
            });

            else
            {
                if (emaildata.Otp == data.Otp)
                {
                    try
                    {
                        emaildata.IsVerified = true;
                        context.EmailVerifications.Update(emaildata);
                        context.SaveChanges();
                        return Ok(new CustomResponse()
                        {
                            Code = 200,
                            Success = true,
                            Message = "Email Id verified"
                        });
                    }
                    catch
                    {
                        return BadRequest(new CustomResponse()
                        {
                            Code = 400,
                            Success = false,
                            Message = "Error updating email status"
                        });
                    }
                }
                else
                {
                    return BadRequest(new CustomResponse()
                    {
                        Code = 400,
                        Success = false,
                        Message = "Incorrect OTP"
                    });
                }
            }
        }

        [HttpPost]
        public ActionResult AttachImage([FromBody] ImageRequest imageRequest)
        {
            if(imageRequest == null) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "Object Null"
            });
            if(imageRequest.Id == null || imageRequest.Image == null || imageRequest.Id == 0 || imageRequest.Image == "") return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "Incomplete Data"
            });
            Person? person = context.People.Find(imageRequest.Id);
            if(person == null) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "Record not found for given Id"
            });
            try
            {
                person.Image = imageRequest.Image;
                context.People.Update(person);
                context.SaveChanges();
                return Ok(new CustomResponse()
                {
                    Code = 200,
                    Success = true,
                    Message = "Image Updated"
                });
            }
            catch
            {
                return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "could not update image"
                });
            }
        }

        [HttpPost]
        public ActionResult RemoveImage([FromBody] ImageRequest imageRequest)
        {
            if (imageRequest == null) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "Object Null"
            });
            if (imageRequest.Id == 0 || imageRequest == null) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "Incomplete Data"
            });
            Person? person = context.People.Find(imageRequest.Id);
            if (person == null) return BadRequest(new CustomResponse()
            {
                Code = 400,
                Success = false,
                Message = "Record not found for given Id"
            });
            try
            {
                person.Image = null;
                context.People.Update(person);
                context.SaveChanges();
                return Ok(new CustomResponse()
                {
                    Code = 200,
                    Success = true,
                    Message = "Image Removed"
                });
            }
            catch
            {
                return BadRequest(new CustomResponse()
                {
                    Code = 400,
                    Success = false,
                    Message = "couldn't Remove image"
                });
            }
        }
    }
}
