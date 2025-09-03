const skillset = [{name : "HTML", proficiency : "Intermediate"},
                    {name : "CSS", proficiency : "Intermediate"},
                    {name : "JavaScript", proficiency : "Beginner"}];
function displaySkills(skills) {
    return skills.map(skill=>`${skill.name}(${skill.proficiency})`);
    
}

console.log(displaySkills(skillset));