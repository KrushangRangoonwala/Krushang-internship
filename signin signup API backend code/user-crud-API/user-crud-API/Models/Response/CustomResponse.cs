﻿namespace user_crud_API.Models.Response
{
    public class CustomResponse
    {
        public int Code { get; set; }
        public bool Success { get; set; }
        public string? Message { get; set; }
        public object? Data { get; set; }
    }
}
