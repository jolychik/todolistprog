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
    public class ProjectController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ProjectController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"SELECT * FROM todo.project";
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
        public JsonResult Post(ProjectClass projects)
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"INSERT INTO todo.project(nameProject, startDate, stateProject, description) 
                            VALUES (@nameProject, @startDate, @stateProject, @description)";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@nameProject", projects.nameProject);
                    myCommand.Parameters.AddWithValue("@startDate", projects.startDate);
                    myCommand.Parameters.AddWithValue("@stateProject", projects.stateProject);
                    myCommand.Parameters.AddWithValue("@description", projects.description);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully!");
        }


        [HttpPut]
        public JsonResult Put(ProjectClass projects)
        {
            //string connectionstring = "server= localhost; port=3308; username=root; password=root; database=todo;";
            string query = @"UPDATE todo.project 
                            SET nameProject = @nameProject, startDate = @startDate, stateProject = @stateProject, description = @description
                            WHERE (idProject = @idProject);";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idProject", projects.idProject);
                    myCommand.Parameters.AddWithValue("@nameProject", projects.nameProject);
                    myCommand.Parameters.AddWithValue("@startDate", projects.startDate);
                    myCommand.Parameters.AddWithValue("@stateProject", projects.stateProject);
                    myCommand.Parameters.AddWithValue("@description", projects.description);
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
            string query = @"DELETE FROM todo.project WHERE (idProject = @idProject)";
            DataTable table = new DataTable();
            string MySqlDataSource = _configuration.GetConnectionString("AppCon");
            MySqlDataReader myReader;
            using (MySqlConnection myCon = new MySqlConnection(MySqlDataSource))
            {
                myCon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idProject", id);
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
