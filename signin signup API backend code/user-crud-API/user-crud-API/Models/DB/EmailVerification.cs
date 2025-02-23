namespace user_crud_API.Models.DB
{
    public class EmailVerification
    {
        public int Id { get; set; }
        public string? EmailId { get; set; }
        public string? Otp { get; set; }
        public bool? IsVerified { get; set; }
        public bool? IsRegistered { get; set; }
    }
}
