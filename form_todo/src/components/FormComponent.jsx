import React from 'react'

const FormComponent = ({ handleRemoveForm, item, index }) => {


    return (

        <div div className='form-container'>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', padding: '20px' }}>
                <button onClick={() => handleRemoveForm()} style={{ backgroundColor: "tomato" }}>-</button>
            </div>
            <div className='form-component'>

                <input type='text' placeholder='Enter Name' />
                <div style={{ display: 'flex' }}>
                    <label for="Male">Male</label>
                    <input type="radio" id="Male" name="gender" value="Male" />
                    <label for="Female">Female</label>
                    <input type="radio" id="Female" name="gender" value="Female" />
                </div>

                <input type='number' placeholder='Enter age' />
                <select name="hobbies" id="hobbies">
                    <option value="">Select hobby</option>
                    <option value="chess">Chess</option>
                    <option value="cricket">Cricket</option>
                    <option value="bgmi">BGMI</option>
                    <option value="carrom">Carrom</option>
                </select>
            </div>
        </div>

    )
}

export default FormComponent