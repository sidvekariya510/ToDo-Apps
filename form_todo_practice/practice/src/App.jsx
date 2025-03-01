import { useState } from 'react'
import './App.css'
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid2 as Grid, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material"

function App() {

  const [groupData, setGroupData] = useState(() => {
    const data = localStorage.getItem('groups')
    return data ? JSON.parse(data) : []
  });



  const handleAddGroup = () => {
    setGroupData([...groupData, {
      id: Date.now(),
      forms: []
    }])
  }
  const handleDeleteGroup = (groupId) => {
    const restGroups = groupData.filter((item) => item.id !== groupId)
    setGroupData(restGroups);
  }


  const handleAddForm = (groupId) => {

    const temp = groupData.map((group) =>
      group.id === groupId ? {
        ...group, forms: [...group.forms, {
          id: Date.now(),
          name: "",
          age: "",
          gender: "",
          hobbies: [],
        }]
      } : group
    )
    setGroupData(temp);

  }
  const handleDeleteForm = (groupId, formId) => {
    const temp = groupData.map((group) =>
      group.id === groupId ? {
        ...group, forms: group.forms.filter((form) => form.id !== formId)
      } : group
    )
    setGroupData(temp);

  }

  const handleFormChange = (groupId, formId, value, key) => {
    const temp = groupData.map((group) =>
      group.id === groupId ? {
        ...group,
        forms: group.forms.map((form) =>
          form.id === formId ? {
            ...form,
            [key]: value
          } : form
        )
      } : group
    )
    setGroupData(temp);
  }

  console.log('groupData', groupData)


  const handleSubmitAll = () => {
    localStorage.setItem('groups', JSON.stringify(groupData))
  }


  return (
    <>
      <Grid container minWidth={'100%'} display={'flex'} justifyContent={'space-between'}>
        <Grid>
          <Button variant='contained' color='primary' onClick={() => handleAddGroup()}>Add Group</Button>
        </Grid>
        <Grid>
          <Button variant='contained' color='success' onClick={() => handleSubmitAll()}>Submit All</Button>
        </Grid>
      </Grid>
      <Stack direction="row" gap={2} mt={2} display={'flex'} flexWrap={'wrap'} >
        {groupData.map((group, index) =>
          <Box key={group.id} sx={{ backgroundColor: "whitesmoke", p: 3, width: '500px', boxShadow: '5px 5px 10px grey', borderRadius: '10px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant='h5'>Group Id : {group.id}</Typography>
              <Button variant='contained' color='error' onClick={() => handleDeleteGroup(group.id)}>Delete Group</Button>
            </Box>
            <Button sx={{ my: 2 }} variant='outlined' fullWidth onClick={() => handleAddForm(group.id)}>Add Form</Button>
            {group.forms.map((form, index) =>

              <Grid container key={form.id} spacing={2} minWidth={'100%'} display={'flex'} justifyContent={'space-between'} sx={{ p: 4, borderRadius: '10px', border: '1px solid lightgray' }}>
                <Grid>
                  <Typography variant='h5'>Form #{index + 1}</Typography>
                </Grid>
                <Grid>
                  <Button variant='outlined' color='error' onClick={() => handleDeleteForm(group.id, form.id)}>Delete Form</Button>
                </Grid>
                <Grid size={12}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      hiddenLabel
                      variant="filled"
                      size="small"
                      placeholder='Name'
                      value={form.name}
                      onChange={(e) => handleFormChange(group.id, form.id, e.target.value, "name")}
                    />
                    <TextField
                      hiddenLabel
                      type='number'
                      variant="filled"
                      size="small"
                      placeholder='Age'
                      value={form.age}
                      onChange={(e) => handleFormChange(group.id, form.id, e.target.value, "age")}
                    />
                    <Typography variant='h6' textAlign={'start'} >Gender</Typography>
                    <FormControl>
                      <RadioGroup
                        row
                        name="gender"
                        value={form.gender}
                        onChange={(e) => handleFormChange(group.id, form.id, e.target.value, "gender")}
                      >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                      </RadioGroup>
                    </FormControl>
                    <Typography variant='h6' textAlign={'start'} >Hobbies</Typography>
                    <FormGroup row>
                      {['Chess', 'Football', 'Carrom', 'Cricket'].map((hobby, index) =>
                        <FormControlLabel
                          key={hobby}
                          control={<Checkbox checked={form.hobbies.includes(hobby)} onChange={(e) => {
                            const updated = e.target.checked ? [...form.hobbies, hobby] : form.hobbies.filter((h) => h !== hobby)
                            handleFormChange(group.id, form.id, updated, "hobbies")
                          }
                          } />}
                          label={hobby} />
                      )}
                    </FormGroup>
                  </Stack>
                </Grid>
              </Grid>
            )}
          </Box>
        )}
      </Stack>
    </>
  )
}

export default App
