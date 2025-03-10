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
    public class StakeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public StakeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"SELECT * FROM todo.stakeholder";
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
        public JsonResult Post(StakeClass stakes)
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"INSERT INTO todo.stakeholder(nameStake, AbNameStake) 
                            VALUES (@nameStake, @AbNameStake)";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@nameStake", stakes.nameStake);
                    myCommand.Parameters.AddWithValue("@AbNameStake", stakes.AbNameStake);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully!");
        }


        [HttpPut]
        public JsonResult Put(StakeClass stakes)
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"UPDATE todo.stakeholder 
                            SET nameStake = @nameStake, AbNameStake = @AbNameStake
                            WHERE (idStake = @idStake);";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idStake", stakes.idStake);
                    myCommand.Parameters.AddWithValue("@nameStake", stakes.nameStake);
                    myCommand.Parameters.AddWithValue("@AbNameStake", stakes.AbNameStake);
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
            string query = @"DELETE FROM todo.stakeholder WHERE (idStake = @idStake)";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idStake", id);
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
