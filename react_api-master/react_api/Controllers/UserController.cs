using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using react_api.Models;

namespace react_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"SELECT * FROM todo.user";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(UserClass users)
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"INSERT INTO todo.user(username, name, surname, password) 
                            VALUES (@username, @name, @surname, @password)";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@username", users.username);
                    myCommand.Parameters.AddWithValue("@name", users.name);
                    myCommand.Parameters.AddWithValue("@surname", users.surname);
                    myCommand.Parameters.AddWithValue("@password", users.password);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully!");
        }


        [HttpPut]
        public JsonResult Put(UserClass users)
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"UPDATE todo.user 
                            SET username = @username, name = @name, surname = @surname, password = @password 
                            WHERE (idUser = @idUser)";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idUser", users.idUser);
                    myCommand.Parameters.AddWithValue("@username", users.username);
                    myCommand.Parameters.AddWithValue("@name", users.name);
                    myCommand.Parameters.AddWithValue("@surname", users.surname);
                    myCommand.Parameters.AddWithValue("@password", users.password);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully!");
        }


        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"DELETE FROM todo.user WHERE (idUser = @idUser)";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idUser", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully!");
        }
    }
}
