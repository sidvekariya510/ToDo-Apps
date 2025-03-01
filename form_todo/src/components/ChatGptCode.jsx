import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    Typography,
    Stack,
    Card,
    CardContent,
} from "@mui/material";

const ChatGpt = () => {
    const [groups, setGroups] = useState(() => {
        const savedData = localStorage.getItem("groups");
        return savedData ? JSON.parse(savedData) : [];
    });

    const handleAddGroup = () => {
        setGroups([...groups, { id: Date.now(), forms: [] }]);
    };

    const handleRemoveGroup = (groupId) => {
        setGroups(groups.filter((group) => group.id !== groupId));
    };

    const handleAddForm = (groupId) => {
        setGroups(
            groups.map((group) =>
                group.id === groupId
                    ? {
                        ...group,
                        forms: [
                            ...group.forms,
                            { id: Date.now(), name: "", age: "", gender: "", hobbies: [] },
                        ],
                    }
                    : group
            )
        );
    };

    const handleRemoveForm = (groupId, formId) => {
        setGroups(
            groups.map((group) =>
                group.id === groupId
                    ? {
                        ...group,
                        forms: group.forms.filter((form) => form.id !== formId),
                    }
                    : group
            )
        );
    };

    const handleFormChange = (groupId, formId, field, value) => {
        setGroups(
            groups.map((group) =>
                group.id === groupId
                    ? {
                        ...group,
                        forms: group.forms.map((form) =>
                            form.id === formId ? { ...form, [field]: value } : form
                        ),
                    }
                    : group
            )
        );
    };

    const handleSubmitAll = () => {
        localStorage.setItem("groups", JSON.stringify(groups));
        alert("All changes have been saved to localStorage!");
    };

    return (
        <Box p={4}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', minWidth: "500px" }}>
                <Button variant="contained" onClick={handleAddGroup}>
                    Add Group
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmitAll}
                >
                    Submit All
                </Button>
            </Box>

            <Stack gap={4} direction={'row'} display={'flex'} flexWrap={'wrap'} >
                {groups.map((group) => (
                    <Card key={group.id} variant="outlined" sx={{ width: '550px' }}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="h6">Group ID: {group.id}</Typography>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleRemoveGroup(group.id)}
                                    >
                                        Remove Group
                                    </Button>
                                </Box>

                                <Button
                                    variant="outlined"
                                    onClick={() => handleAddForm(group.id)}
                                >
                                    Add Form
                                </Button>

                                <Stack spacing={2}>
                                    {group.forms.map((form, index) => (
                                        <Card key={form.id} variant="outlined" sx={{ p: 2 }}>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="body1">Form #{index + 1}</Typography>
                                                <Button
                                                    variant="text"
                                                    color="error"
                                                    onClick={() => handleRemoveForm(group.id, form.id)}
                                                >
                                                    Delete Form
                                                </Button>
                                            </Box>

                                            <TextField
                                                label="Name"
                                                fullWidth
                                                margin="normal"
                                                value={form.name}
                                                onChange={(e) =>
                                                    handleFormChange(group.id, form.id, "name", e.target.value)
                                                }
                                            />

                                            <TextField
                                                label="Age"
                                                type="number"
                                                fullWidth
                                                margin="normal"
                                                value={form.age}
                                                onChange={(e) =>
                                                    handleFormChange(group.id, form.id, "age", e.target.value)
                                                }
                                            />

                                            <Typography variant="body2" mt={2} mb={1}>
                                                Gender:
                                            </Typography>
                                            <RadioGroup
                                                row
                                                value={form.gender}
                                                onChange={(e) =>
                                                    handleFormChange(group.id, form.id, "gender", e.target.value)
                                                }
                                            >
                                                <FormControlLabel
                                                    value="male"
                                                    control={<Radio />}
                                                    label="Male"
                                                />
                                                <FormControlLabel
                                                    value="female"
                                                    control={<Radio />}
                                                    label="Female"
                                                />
                                                <FormControlLabel
                                                    value="other"
                                                    control={<Radio />}
                                                    label="Other"
                                                />
                                            </RadioGroup>

                                            <Typography variant="body2" mt={2} mb={1}>
                                                Hobbies:
                                            </Typography>
                                            <Stack direction="row" spacing={2}>
                                                {[
                                                    "Reading",
                                                    "Traveling",
                                                    "Gaming",
                                                    "Cooking",
                                                ].map((hobby) => (
                                                    <FormControlLabel
                                                        key={hobby}
                                                        control={
                                                            <Checkbox
                                                                checked={form.hobbies.includes(hobby)}
                                                                onChange={(e) => {
                                                                    const updatedHobbies = e.target.checked
                                                                        ? [...form.hobbies, hobby]
                                                                        : form.hobbies.filter((h) => h !== hobby);
                                                                    handleFormChange(group.id, form.id, "hobbies", updatedHobbies);
                                                                }}
                                                            />
                                                        }
                                                        label={hobby}
                                                    />
                                                ))}
                                            </Stack>
                                        </Card>
                                    ))}
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
};

export default ChatGpt;
