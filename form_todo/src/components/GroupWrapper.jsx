import React, { useEffect, useState } from 'react'
import FormComponent from './FormComponent';
import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';

const GroupWrapper = () => {



    const [groupData, setGroupData] = useState(() => {
        const data = localStorage.getItem("groups");
        return data ? JSON.parse(data) : []
    })

    console.log('groupData', groupData);

    const handleGroupAdd = () => {
        const uniqueId = Date.now();
        const temp = [...groupData, {
            id: uniqueId,
            forms: []
        }];
        setGroupData(temp);
    }
    const handleRemoveGroup = (groupId) => {
        console.log('group deleted', groupId);
        const temp = groupData.filter((item) => item.id !== groupId);
        setGroupData(temp);
    }




    const handleAddForm = (groupId) => {
        const temp = groupData.map((group) =>
            group.id === groupId ?
                {
                    ...group,
                    forms: [
                        ...group.forms, {
                            id: Date.now(),
                            name: "",
                            age: "",
                            gender: "",
                            hobbies: [],
                        }
                    ]
                } : group
        )
        setGroupData(temp);
    }
    const handleRemoveForm = (groupId, formId) => {
        const temp = groupData.map((group) =>
            group.id === groupId ?
                {
                    ...group,
                    forms: group.forms.filter((form) => form.id !== formId)
                } : group
        )
        setGroupData(temp);
    }


    const handleFormChange = (groupId, formId, key, value) => {
        const temp = groupData.map((group) =>
            group.id === groupId ?
                {
                    ...group,
                    forms: group.forms.map((form) =>
                        form.id === formId ?
                            {
                                ...form, [key]: value
                            }
                            : form
                    )
                } : group
        )
        setGroupData(temp);
    }


    const handleSubmitAll = () => {
        localStorage.setItem("groups", JSON.stringify(groupData))
    }

    return (
        <Box p={4}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                <button onClick={() => handleGroupAdd()}>Add Group</button>
                <button onClick={() => handleSubmitAll()}>Submit All</button>
            </div>
            <Stack gap={4} direction={'row'} display={'flex'} flexWrap={'wrap'} >
                {groupData.map((group, index) => (
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
                                    {group.forms.map((form, index) => {
                                        return (
                                            <Card key={form.id} sx={{ px: 2 }}>
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
                                                    size='small'
                                                    name='name'
                                                    placeholder='Name'
                                                    fullWidth
                                                    margin="normal"
                                                    value={form.name}
                                                    onChange={(e) =>
                                                        handleFormChange(group.id, form.id, "name", e.target.value)
                                                    }
                                                />
                                                <TextField
                                                    size='small'
                                                    name='age'
                                                    placeholder='Age'
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
                                                    name='gender'
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
                                                </RadioGroup>

                                                <Typography variant="body2" mt={2} mb={1}>
                                                    Hobbies:
                                                </Typography>
                                                <Stack direction="row" spacing={2}>
                                                    {
                                                        ["Reading",
                                                            "Traveling",
                                                            "Gaming",
                                                            "Cooking",].map((hobby) => (
                                                                <FormControlLabel
                                                                    key={hobby}
                                                                    control={
                                                                        <Checkbox
                                                                            checked={form.hobbies.includes(hobby)}
                                                                            onChange={(e) => {
                                                                                const updatedHobbies = e.target.checked ?
                                                                                    [...form.hobbies, hobby] :
                                                                                    form.hobbies.filter((h) => h !== hobby);
                                                                                handleFormChange(group.id, form.id, "hobbies", updatedHobbies)
                                                                            }}
                                                                        />}
                                                                    label={hobby}
                                                                />
                                                            ))
                                                    }
                                                </Stack>
                                            </Card>
                                        )
                                    })}
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    )
}

export default GroupWrapper