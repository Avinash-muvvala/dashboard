import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import { useNavigate } from "react-router-dom";
import "./ResumeBuilderPage.css";

type EducationLevel =
  | "Primary"
  | "Secondary"
  | "Graduation"
  | "Post-graduation";
type TemplateLayout =
  | "modern"
  | "classic"
  | "minimal"
  | "creative"
  | "sidebar"
  | "compact";

type ResumeTemplate = {
  id: string;
  name: string;
  layout: TemplateLayout;
  accent: string;
};

type EducationEntry = {
  id: string;
  level: EducationLevel;
  school: string;
  qualification: string;
  year: string;
};

type ProjectEntry = {
  name: string;
  description: string;
  technologies: string;
};

type ResumeData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  objective: string;
  experienceYears: string;
  education: EducationEntry[];
  skills: string;
  technologies: string;
  projects: ProjectEntry[];
  achievements: string[];
  workExperience: string;
};

type ScoreCheck = {
  label: string;
  points: number;
  passed: boolean;
  suggestion: string;
};

const educationLevels: EducationLevel[] = [
  "Primary",
  "Secondary",
  "Graduation",
  "Post-graduation",
];

const templateLayouts: { id: TemplateLayout; name: string }[] = [
  { id: "modern", name: "Modern" },
  { id: "classic", name: "Classic" },
  { id: "minimal", name: "Minimal" },
  { id: "creative", name: "Creative" },
  { id: "sidebar", name: "Sidebar" },
  { id: "compact", name: "Compact" },
];

const templatePalettes = [
  { id: "forest", name: "Forest", accent: "#26745a" },
  { id: "ocean", name: "Ocean", accent: "#2f6688" },
  { id: "burgundy", name: "Burgundy", accent: "#914b57" },
  { id: "indigo", name: "Indigo", accent: "#6653a3" },
  { id: "slate", name: "Slate", accent: "#455a64" },
  { id: "amber", name: "Amber", accent: "#a86b24" },
];

const resumeTemplates: ResumeTemplate[] = templatePalettes.flatMap((palette) =>
  templateLayouts.map((layout) => ({
    id: `${layout.id}-${palette.id}`,
    name: `${palette.name} ${layout.name}`,
    layout: layout.id,
    accent: palette.accent,
  })),
);

const initialResume: ResumeData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  objective: "",
  experienceYears: "0",
  education: [],
  skills: "",
  technologies: "",
  projects: [{ name: "", description: "", technologies: "" }],
  achievements: [""],
  workExperience: "",
};

const splitList = (value: string) =>
  value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

const ResumeBuilderPage = () => {
  const navigate = useNavigate();
  const [resume, setResume] = useState<ResumeData>(initialResume);
  const [template, setTemplate] = useState<ResumeTemplate>(resumeTemplates[0]);
  const [showPreview, setShowPreview] = useState(false);

  const scoreChecks = useMemo<ScoreCheck[]>(() => {
    const fullName = `${resume.firstName} ${resume.lastName}`.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resume.email);
    const educationComplete = resume.education.some(
      (entry) => entry.school.trim() && entry.qualification.trim(),
    );
    const projectEntries = resume.projects.filter(
      (project) => project.name.trim() && project.description.trim(),
    );
    const hasActionableProject = projectEntries.some(
      (project) =>
        project.description.trim().length >= 45 &&
        (/\d/.test(project.description) ||
          /\b(led|built|created|improved|reduced|increased|developed|implemented|designed)\b/i.test(
            project.description,
          )),
    );
    const checks: ScoreCheck[] = [
      {
        label: "Full name",
        points: 10,
        passed: Boolean(fullName),
        suggestion: "Add your first and last name.",
      },
      {
        label: "Valid email",
        points: 10,
        passed: validEmail,
        suggestion: "Add a valid email address in your contact details.",
      },
      {
        label: "Contact number",
        points: 5,
        passed: resume.phone.replace(/\D/g, "").length >= 7,
        suggestion: "Add a contact number with at least 7 digits.",
      },
      {
        label: "Career objective",
        points: 10,
        passed: resume.objective.trim().length >= 50,
        suggestion:
          "Write a focused objective of at least 50 characters for the role you want.",
      },
      {
        label: "Education",
        points: 10,
        passed: Boolean(educationComplete),
        suggestion: "Add a qualification and school or institution.",
      },
      {
        label: "Skills",
        points: 10,
        passed: splitList(resume.skills).length >= 3,
        suggestion: "List at least 3 relevant skills, separated by commas.",
      },
      {
        label: "Technologies",
        points: 5,
        passed: splitList(resume.technologies).length >= 2,
        suggestion: "Add at least 2 relevant tools or technologies.",
      },
      {
        label: "Project details",
        points: 15,
        passed: projectEntries.length > 0,
        suggestion: "Add a project with a title and a clear description.",
      },
      {
        label: "Impact in a project",
        points: 10,
        passed: Boolean(hasActionableProject),
        suggestion:
          "Describe your contribution and outcome; include a result or measurable impact when possible.",
      },
      {
        label: "Achievements",
        points: 5,
        passed: resume.achievements.some((item) => item.trim()),
        suggestion: "Add an achievement, award, certification, or recognition.",
      },
      {
        label: "Experience details",
        points: 10,
        passed:
          Number(resume.experienceYears) === 0 ||
          resume.workExperience.trim().length >= 40,
        suggestion:
          "Add a short work history with responsibilities and outcomes, or select Fresher if you have no work experience.",
      },
    ];
    return checks;
  }, [resume]);

  const score = scoreChecks.reduce(
    (total, check) => total + (check.passed ? check.points : 0),
    0,
  );
  const suggestions = scoreChecks
    .filter((check) => !check.passed)
    .map((check) => check.suggestion);
  const hasResumeContent = Boolean(
    resume.firstName.trim() ||
    resume.lastName.trim() ||
    resume.email.trim() ||
    resume.phone.trim() ||
    resume.objective.trim() ||
    resume.workExperience.trim() ||
    resume.skills.trim() ||
    resume.technologies.trim() ||
    resume.education.some(
      (entry) =>
        entry.school.trim() ||
        entry.qualification.trim() ||
        entry.year.trim(),
    ) ||
    resume.projects.some(
      (project) =>
        project.name.trim() ||
        project.description.trim() ||
        project.technologies.trim(),
    ) ||
    resume.achievements.some((item) => item.trim()),
  );

  const updateResume = <K extends keyof ResumeData>(
    key: K,
    value: ResumeData[K],
  ) => {
    setResume((current) => ({ ...current, [key]: value }));
  };

  const updateEducationField = (
    id: string,
    key: "school" | "qualification" | "year",
    value: string,
  ) => {
    setResume((current) => ({
      ...current,
      education: current.education.map((entry) =>
        entry.id === id ? { ...entry, [key]: value } : entry,
      ),
    }));
  };

  const updateEducationLevel = (id: string, level: EducationLevel) => {
    setResume((current) => ({
      ...current,
      education: current.education.map((entry) =>
        entry.id === id ? { ...entry, level } : entry,
      ),
    }));
  };

  const addEducation = () => {
    setResume((current) => ({
      ...current,
      education: [
        ...current.education,
        {
          id: crypto.randomUUID(),
          level: "Graduation",
          school: "",
          qualification: "",
          year: "",
        },
      ],
    }));
  };

  const removeEducation = (id: string) => {
    setResume((current) => ({
      ...current,
      education: current.education.filter((entry) => entry.id !== id),
    }));
  };

  const updateProject = (
    index: number,
    key: keyof ProjectEntry,
    value: string,
  ) => {
    setResume((current) => ({
      ...current,
      projects: current.projects.map((project, projectIndex) =>
        projectIndex === index ? { ...project, [key]: value } : project,
      ),
    }));
  };

  const updateAchievement = (index: number, value: string) => {
    setResume((current) => ({
      ...current,
      achievements: current.achievements.map((achievement, itemIndex) =>
        itemIndex === index ? value : achievement,
      ),
    }));
  };

  const handleDownload = () => {
    if (!hasResumeContent) return;
    window.print();
  };

  const fullName =
    `${resume.firstName.trim()} ${resume.lastName.trim()}`.trim() ||
    "Your Name";
  const educationEntries = resume.education.filter(
    (entry) => entry.school || entry.qualification || entry.year,
  );
  const projects = resume.projects.filter(
    (project) => project.name || project.description || project.technologies,
  );
  const achievements = resume.achievements.filter((item) => item.trim());
  const objectiveSection = resume.objective ? (
    <ResumeSection title="Professional summary">
      <Typography>{resume.objective}</Typography>
    </ResumeSection>
  ) : null;
  const educationSection = educationEntries.length > 0 ? (
    <ResumeSection title="Education">
      {educationEntries.map((entry) => (
        <Box key={entry.id} className="resume-entry">
          <Typography sx={{ fontWeight: 700 }}>
            {entry.qualification || entry.level}
          </Typography>
          <Typography color="text.secondary">
            {[entry.level, entry.school, entry.year]
              .filter(Boolean)
              .join(" · ")}
          </Typography>
        </Box>
      ))}
    </ResumeSection>
  ) : null;
  const experienceSection =
    Number(resume.experienceYears) > 0 && resume.workExperience ? (
      <ResumeSection title="Experience">
        <Typography sx={{ whiteSpace: "pre-line" }}>
          {resume.workExperience}
        </Typography>
      </ResumeSection>
    ) : null;
  const projectsSection =
    projects.length > 0 ? (
      <ResumeSection title="Projects">
        {projects.map((project, index) => (
          <Box key={`${project.name}-${index}`} className="resume-entry">
            <Typography sx={{ fontWeight: 700 }}>
              {project.name || "Project"}
            </Typography>
            {project.description && (
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {project.description}
              </Typography>
            )}
            {project.technologies && (
              <Typography color="text.secondary" variant="body2">
                Technologies: {project.technologies}
              </Typography>
            )}
          </Box>
        ))}
      </ResumeSection>
    ) : null;
  const skillsSection = splitList(resume.skills).length > 0 ? (
    <ResumeSection title="Skills">
      <Typography>{splitList(resume.skills).join(" · ")}</Typography>
    </ResumeSection>
  ) : null;
  const technologiesSection = splitList(resume.technologies).length > 0 ? (
    <ResumeSection title="Technologies">
      <Typography>{splitList(resume.technologies).join(" · ")}</Typography>
    </ResumeSection>
  ) : null;
  const achievementsSection =
    achievements.length > 0 ? (
      <ResumeSection title="Achievements & Awards">
        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          {achievements.map((achievement, index) => (
            <li key={`${achievement}-${index}`}>{achievement}</li>
          ))}
        </Box>
      </ResumeSection>
    ) : null;
  const regularSections = (
    <>
      {objectiveSection}
      {educationSection}
      {experienceSection}
      {projectsSection}
      {skillsSection}
      {technologiesSection}
      {achievementsSection}
    </>
  );
  const sidebarMainSections = (
    <>
      {objectiveSection}
      {experienceSection}
      {projectsSection}
      {achievementsSection}
    </>
  );

  return (
    <Box className="resume-builder-shell" sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            mb: 3,
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }}
          >
            Back to home
          </Button>
          <Chip
            icon={<FactCheckOutlinedIcon />}
            label="Private: scoring stays in your browser"
            color="success"
            variant="outlined"
          />
        </Stack>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ fontWeight: 800 }}
          >
            RESUME STUDIO
          </Typography>
          <Typography component="h1" variant="h3" sx={{ mb: 1 }}>
            Create a resume that feels like you
          </Typography>
          <Typography color="text.secondary">
            Add your details, choose a template, and review practical ATS-style
            checks. Your information is not sent to an external service.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Button
            variant={!showPreview ? "contained" : "outlined"}
            onClick={() => setShowPreview(false)}
          >
            1. Your details
          </Button>
          <Button
            variant={showPreview ? "contained" : "outlined"}
            onClick={() => setShowPreview(true)}
          >
            2. Preview & score
          </Button>
        </Stack>

        {showPreview ? (
          <Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper
                className={`resume-print-preview resume-template-${template.layout}`}
                elevation={2}
                sx={{
                  "--resume-accent": template.accent,
                  minHeight: 700,
                  p: { xs: 3, sm: 5 },
                }}
              >
                <Box className="resume-preview-header">
                  <Typography
                    className="resume-preview-name"
                    component="h2"
                    variant="h3"
                  >
                    {fullName}
                  </Typography>
                  {template.layout !== "sidebar" && (
                    <Box className="resume-preview-contact">
                      {resume.email && (
                        <span className="resume-preview-contact-item">
                          {resume.email}
                        </span>
                      )}
                      {resume.phone && (
                        <span className="resume-preview-contact-item">
                          {resume.phone}
                        </span>
                      )}
                    </Box>
                  )}
                </Box>

                {template.layout === "sidebar" ? (
                  <Box className="resume-preview-columns">
                    <Box
                      component="aside"
                      className="resume-preview-sidebar"
                      aria-label="Contact and additional resume details"
                    >
                      <ResumeSection title="Contact">
                        <Stack className="resume-preview-contact" spacing={0.5}>
                          {resume.email && <span>{resume.email}</span>}
                          {resume.phone && <span>{resume.phone}</span>}
                        </Stack>
                      </ResumeSection>
                      {educationSection}
                      {skillsSection}
                      {technologiesSection}
                    </Box>
                    <Box component="main" className="resume-preview-main">
                      {sidebarMainSections}
                    </Box>
                  </Box>
                ) : (
                  <Box className="resume-preview-main">{regularSections}</Box>
                )}
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={2}>
                <Paper sx={{ p: 2.5 }}>
                  <Stack
                    direction="row"
                    sx={{
                      mb: 0.5,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">Choose a template</Typography>
                    <Chip
                      size="small"
                      color="primary"
                      label={`${resumeTemplates.length} designs`}
                    />
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5 }}
                  >
                    Selected: {template.name}. Choose a thumbnail to update the
                    preview.
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: 1,
                      maxHeight: { xs: 380, md: 470 },
                      overflowY: "auto",
                      pr: 0.5,
                    }}
                  >
                    {resumeTemplates.map((option) => {
                      const selected = template.id === option.id;
                      return (
                        <ButtonBase
                          key={option.id}
                          aria-label={`Select ${option.name} resume template`}
                          aria-pressed={selected}
                          onClick={() => setTemplate(option)}
                          sx={{
                            display: "block",
                            width: "100%",
                            p: 1,
                            border: "1px solid",
                            borderColor: selected ? option.accent : "divider",
                            borderRadius: 2,
                            textAlign: "left",
                            "&:hover": {
                              borderColor: option.accent,
                              bgcolor: "action.hover",
                            },
                          }}
                        >
                          <Box
                            className={`resume-template-thumb resume-template-${option.layout}`}
                            sx={{ "--resume-accent": option.accent }}
                          >
                            <Box className="resume-template-thumb-header">
                              <Box className="resume-template-thumb-name" />
                              <Box className="resume-template-thumb-contact" />
                            </Box>
                            <Box className="resume-template-thumb-body">
                              <Box className="resume-template-thumb-sidebar">
                                <Box className="resume-template-thumb-section-title" />
                                <Box className="resume-template-thumb-line" />
                                <Box className="resume-template-thumb-line resume-template-thumb-line-short" />
                                <Box className="resume-template-thumb-section-title" />
                                <Box className="resume-template-thumb-line" />
                              </Box>
                              <Box className="resume-template-thumb-main">
                                <Box className="resume-template-thumb-section-title" />
                                <Box className="resume-template-thumb-line resume-template-thumb-line-wide" />
                                <Box className="resume-template-thumb-line" />
                                <Box className="resume-template-thumb-section-title" />
                                <Box className="resume-template-thumb-line resume-template-thumb-line-wide" />
                                <Box className="resume-template-thumb-line resume-template-thumb-line-short" />
                              </Box>
                            </Box>
                          </Box>
                          <Typography
                            variant="caption"
                            noWrap
                            sx={{ display: "block", mt: 0.75, fontWeight: 700 }}
                          >
                            {option.name}
                          </Typography>
                        </ButtonBase>
                      );
                    })}
                  </Box>
                </Paper>
                <Paper sx={{ p: 2.5 }}>
                  <Stack
                    direction="row"
                    sx={{
                      mb: 1,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">Resume checklist score</Typography>
                    <Typography
                      variant="h5"
                      color={score > 80 ? "success.main" : "warning.dark"}
                      sx={{ fontWeight: 800 }}
                    >
                      {score}%
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary" variant="body2">
                    Local writing guidance, not an actual ATS or AI evaluation.
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Alert severity="info" sx={{ mb: 2 }}>
                    No template or score can guarantee an interview. A template
                    improves presentation; shortlisting depends on how well your
                    experience and results match the role and employer criteria.
                  </Alert>
                  <Stack spacing={0.75} sx={{ mb: 2 }}>
                    {scoreChecks.map((check) => (
                      <Stack
                        key={check.label}
                        direction="row"
                        spacing={1}
                        sx={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body2">{check.label}</Typography>
                        <Chip
                          size="small"
                          color={check.passed ? "success" : "default"}
                          variant={check.passed ? "filled" : "outlined"}
                          label={
                            check.passed ? `+${check.points} pts` : "Improve"
                          }
                        />
                      </Stack>
                    ))}
                  </Stack>
                  {suggestions.length ? (
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        Recommended improvements
                      </Typography>
                      {suggestions.map((suggestion) => (
                        <Typography
                          key={suggestion}
                          variant="body2"
                          color="text.secondary"
                        >
                          • {suggestion}
                        </Typography>
                      ))}
                    </Stack>
                  ) : (
                    <Alert severity="success">
                      All checklist items are complete. Review your resume for
                      accuracy before downloading.
                    </Alert>
                  )}
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    disabled={!hasResumeContent}
                    onClick={handleDownload}
                    sx={{ mt: 2 }}
                  >
                    Download resume PDF
                  </Button>
                  {!hasResumeContent ? (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 1, display: "block", textAlign: "center" }}
                    >
                      Add some resume details to enable PDF download.
                    </Typography>
                  ) : (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 1, display: "block", textAlign: "center" }}
                    >
                      Choose “Save as PDF” in the print dialog. Your checklist
                      score will not block the download.
                    </Typography>
                  )}
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Stack spacing={2.5}>
            <ResumeFormSection title="Personal details">
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="First name"
                    value={resume.firstName}
                    onChange={(event) =>
                      updateResume("firstName", event.target.value)
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Last name"
                    value={resume.lastName}
                    onChange={(event) =>
                      updateResume("lastName", event.target.value)
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email address"
                    value={resume.email}
                    onChange={(event) =>
                      updateResume("email", event.target.value)
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Contact number"
                    value={resume.phone}
                    onChange={(event) =>
                      updateResume("phone", event.target.value)
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Career objective"
                    placeholder="Summarize your strengths and the role you are targeting."
                    value={resume.objective}
                    onChange={(event) =>
                      updateResume("objective", event.target.value)
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="experience-label">Experience</InputLabel>
                    <Select
                      labelId="experience-label"
                      label="Experience"
                      value={resume.experienceYears}
                      onChange={(event) =>
                        updateResume("experienceYears", event.target.value)
                      }
                    >
                      <MenuItem value="0">Fresher</MenuItem>
                      {Array.from({ length: 15 }, (_, index) => index + 1).map(
                        (years) => (
                          <MenuItem key={years} value={String(years)}>
                            {years} {years === 1 ? "year" : "years"}
                          </MenuItem>
                        ),
                      )}
                      <MenuItem value="15">15+ years</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </ResumeFormSection>

            <ResumeFormSection
              title="Education"
              description="Add only the education levels you want. Remove any entry with the delete button."
            >
              <Stack spacing={2}>
                {resume.education.map((entry) => (
                  <Paper key={entry.id} variant="outlined" sx={{ p: 2 }}>
                    <Grid container spacing={1.5}>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <FormControl fullWidth>
                          <InputLabel id={`education-level-${entry.id}`}>
                            Education level
                          </InputLabel>
                          <Select
                            labelId={`education-level-${entry.id}`}
                            label="Education level"
                            value={entry.level}
                            onChange={(event) =>
                              updateEducationLevel(
                                entry.id,
                                event.target.value as EducationLevel,
                              )
                            }
                          >
                            {educationLevels.map((level) => (
                              <MenuItem key={level} value={level}>
                                {level}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <TextField
                          fullWidth
                          label="School / institution"
                          value={entry.school}
                          onChange={(event) =>
                            updateEducationField(
                              entry.id,
                              "school",
                              event.target.value,
                            )
                          }
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <TextField
                          fullWidth
                          label="Qualification"
                          value={entry.qualification}
                          onChange={(event) =>
                            updateEducationField(
                              entry.id,
                              "qualification",
                              event.target.value,
                            )
                          }
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 2 }}>
                        <TextField
                          fullWidth
                          label="Year"
                          value={entry.year}
                          onChange={(event) =>
                            updateEducationField(
                              entry.id,
                              "year",
                              event.target.value,
                            )
                          }
                        />
                      </Grid>
                      <Grid
                        size={{ xs: 12, sm: 1 }}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: { xs: "flex-end", sm: "center" },
                        }}
                      >
                        <IconButton
                          color="error"
                          aria-label={`Remove ${entry.level} education`}
                          onClick={() => removeEducation(entry.id)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={addEducation}
                  sx={{ alignSelf: "flex-start" }}
                >
                  Add education
                </Button>
              </Stack>
            </ResumeFormSection>

            <ResumeFormSection title="Skills & technologies">
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Skills"
                    placeholder="Communication, problem solving, Java"
                    value={resume.skills}
                    onChange={(event) =>
                      updateResume("skills", event.target.value)
                    }
                    helperText="Separate each skill with a comma or a new line."
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Technologies"
                    placeholder="React, Spring Boot, PostgreSQL"
                    value={resume.technologies}
                    onChange={(event) =>
                      updateResume("technologies", event.target.value)
                    }
                    helperText="Separate technologies with a comma or a new line."
                  />
                </Grid>
              </Grid>
            </ResumeFormSection>

            {Number(resume.experienceYears) > 0 && (
              <ResumeFormSection title="Work experience">
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Roles, responsibilities, and outcomes"
                  placeholder="Company, role, dates, responsibilities, and results"
                  value={resume.workExperience}
                  onChange={(event) =>
                    updateResume("workExperience", event.target.value)
                  }
                />
              </ResumeFormSection>
            )}

            <ResumeFormSection title="Project details">
              <Stack spacing={2}>
                {resume.projects.map((project, index) => (
                  <Paper
                    key={`project-${index}`}
                    variant="outlined"
                    sx={{ p: 2 }}
                  >
                    <Stack spacing={1.5}>
                      <TextField
                        fullWidth
                        label={`Project ${index + 1} name`}
                        value={project.name}
                        onChange={(event) =>
                          updateProject(index, "name", event.target.value)
                        }
                      />
                      <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        label="Project description"
                        value={project.description}
                        onChange={(event) =>
                          updateProject(
                            index,
                            "description",
                            event.target.value,
                          )
                        }
                      />
                      <TextField
                        fullWidth
                        label="Technologies used"
                        value={project.technologies}
                        onChange={(event) =>
                          updateProject(
                            index,
                            "technologies",
                            event.target.value,
                          )
                        }
                      />
                      {resume.projects.length > 1 && (
                        <Button
                          color="inherit"
                          onClick={() =>
                            updateResume(
                              "projects",
                              resume.projects.filter(
                                (_, itemIndex) => itemIndex !== index,
                              ),
                            )
                          }
                          sx={{ alignSelf: "flex-start" }}
                        >
                          Remove project
                        </Button>
                      )}
                    </Stack>
                  </Paper>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={() =>
                    updateResume("projects", [
                      ...resume.projects,
                      { name: "", description: "", technologies: "" },
                    ])
                  }
                  sx={{ alignSelf: "flex-start" }}
                >
                  Add project
                </Button>
              </Stack>
            </ResumeFormSection>

            <ResumeFormSection title="Achievements & rewards">
              <Stack spacing={1.5}>
                {resume.achievements.map((achievement, index) => (
                  <Stack
                    key={`achievement-${index}`}
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                  >
                    <TextField
                      fullWidth
                      label={`Achievement ${index + 1}`}
                      value={achievement}
                      onChange={(event) =>
                        updateAchievement(index, event.target.value)
                      }
                    />
                    {resume.achievements.length > 1 && (
                      <Button
                        color="inherit"
                        onClick={() =>
                          updateResume(
                            "achievements",
                            resume.achievements.filter(
                              (_, itemIndex) => itemIndex !== index,
                            ),
                          )
                        }
                      >
                        Remove
                      </Button>
                    )}
                  </Stack>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={() =>
                    updateResume("achievements", [...resume.achievements, ""])
                  }
                  sx={{ alignSelf: "flex-start" }}
                >
                  Add achievement
                </Button>
              </Stack>
            </ResumeFormSection>

            <Alert severity="info">
              Your resume data is used only in this page. The readiness score is
              a local checklist, not a guaranteed hiring outcome.
            </Alert>
            <Button
              variant="contained"
              size="large"
              onClick={() => setShowPreview(true)}
              sx={{ alignSelf: "flex-end" }}
            >
              Preview & check score
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

const ResumeFormSection = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <Paper sx={{ p: { xs: 2, sm: 3 } }}>
    <Typography variant="h6" sx={{ mb: description ? 0.5 : 2 }}>
      {title}
    </Typography>
    {description && (
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
    )}
    {children}
  </Paper>
);

const ResumeSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box className="resume-section" sx={{ mb: 2.5 }}>
    <Typography
      className="resume-section-title"
      variant="subtitle1"
      sx={{
        mb: 0.75,
        fontWeight: 800,
        color: "var(--resume-accent, #174b38)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default ResumeBuilderPage;
