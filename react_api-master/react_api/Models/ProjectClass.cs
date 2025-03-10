using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_api.Models
{
    public class ProjectClass
    {
        public int idProject { get; set; }
        public string nameProject { get; set; }
        public string startDate { get; set; }
        public string stateProject { get; set; }
        public string description { get; set; }

        //нужность этого пока под вопросом
        public string project_idProject { get; set; }
    }
}
