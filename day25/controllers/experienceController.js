let experiences = require("../data/experiences");
const { successResponse, errorResponse } = require("../utils/response");

// GET all experiences with filters
const getExperiences = (req, res) => {
  let { search, company, isCurrent } = req.query;
  let results = experiences;

  if (search) {
    const lower = search.toLowerCase();
    results = results.filter(e =>
      e.company.toLowerCase().includes(lower) ||
      e.position.toLowerCase().includes(lower) ||
      e.description.toLowerCase().includes(lower)
    );
  }

  if (company) {
    results = results.filter(e => e.company.toLowerCase() === company.toLowerCase());
  }

  if (isCurrent) {
    const boolVal = isCurrent === "true";
    results = results.filter(e => e.isCurrent === boolVal);
  }

  res.json(successResponse(results, { search, company, isCurrent }, experiences.length));
};

// GET single experience
const getExperienceById = (req, res) => {
  const exp = experiences.find(e => e.id == req.params.id);
  if (exp) res.json(successResponse(exp));
  else res.status(404).json(errorResponse("Work experience not found", "EXPERIENCE_NOT_FOUND"));
};

// POST create new
const createExperience = (req, res) => {
  if (!req.body.company || !req.body.position) {
    return res.status(400).json(errorResponse("Missing required fields", "BAD_REQUEST"));
  }

  const newExp = { id: Date.now(), ...req.body };
  experiences.push(newExp);
  res.status(201).json(successResponse(newExp));
};

// PUT update
const updateExperience = (req, res) => {
  const index = experiences.findIndex(e => e.id == req.params.id);
  if (index !== -1) {
    experiences[index] = { ...experiences[index], ...req.body };
    res.json(successResponse(experiences[index]));
  } else {
    res.status(404).json(errorResponse("Work experience not found", "EXPERIENCE_NOT_FOUND"));
  }
};

// DELETE
const deleteExperience = (req, res) => {
  const exists = experiences.find(e => e.id == req.params.id);
  if (!exists) {
    return res.status(404).json(errorResponse("Work experience not found", "EXPERIENCE_NOT_FOUND"));
  }

  experiences = experiences.filter(e => e.id != req.params.id);
  res.json(successResponse({ message: "Experience deleted" }));
};

// Stats
const getStats = (req, res) => {
  const total = experiences.length;
  const current = experiences.filter(e => e.isCurrent).length;
  const companies = new Set(experiences.map(e => e.company)).size;
  const yearsOfExperience = 12; // dummy

  const skillCounts = {};
  experiences.forEach(e => {
    e.technologies.forEach(t => {
      skillCounts[t] = (skillCounts[t] || 0) + 1;
    });
  });
  const topSkills = Object.entries(skillCounts)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count);

  const industryCounts = {};
  experiences.forEach(e => {
    industryCounts[e.industry] = (industryCounts[e.industry] || 0) + 1;
  });
  const industries = Object.entries(industryCounts)
    .map(([industry, count]) => ({ industry, count }));

  res.json(successResponse({
    total,
    current,
    companies,
    yearsOfExperience,
    topSkills,
    industries
  }));
};

module.exports = {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  getStats
};
