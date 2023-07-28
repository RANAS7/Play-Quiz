import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useState } from 'react'
import Joi from 'joi'

const Form = () => {
    const[data, setData]=useState({
        name:"",
        email:"",
        phone:"",
        gender:""
    });

    const[errorData, setErrorData]=useState({
        name:"",
        email:"",
        phone:"",
        gender:""
    });

    const validatorScheme=Joi.object({
        name:Joi.string().min(10).max(50).required(),
        email:Joi.string().email({tlds:{allow:false}}).required(),
        phone:Joi.number().required(),
        gender:Joi.string().required()

    });

    const validateData=()=>{
        const {error}= validatorScheme.validate(data);
        if(!error){
            setErrorData({
                name:"",
                email:"",
                phone:"",
                gender:""
            })
            return true;
        }
        else {
            for(let item of error.details){
                let updatedError = {...errorData};
                updatedError[item.path[0]] = item.message;
                setErrorData(updatedError);
            }
            return false;
        }   
    }

    const save=(event)=>{
       const validate = validateData(event);
       if(validate){
        alert("form is sucess");
       }

    }
    const handleChange=(event)=>{
        let updateData={...data};
        updateData[event.target.name]=event.target.value;
        setData(updateData);
    }
  return (
    <div style={{padding:12}}>
    <TextField 
    error={errorData.name?true:false}
    helperText={errorData.name}
    name='name'
    value={data.name}
    onChange={handleChange}
    required style={{width:'100%', marginTop:12}} id="filled-basic" label="Name" variant='filled'/> 
    <TextField
    error={errorData.email?true:false}
    helperText={errorData.email}
    name='email'
    value={data.email}
    onChange={handleChange}
    required style={{width:'100%', marginTop:12}} id="filled-basic" label="Email" variant='filled'/> 
    <TextField
    error={errorData.phone?true:false}
    helperText={errorData.phone}
    name='phone'
    value={data.phone}
    onChange={handleChange}
    required style={{width:'100%', marginTop:12}} id="filled-basic" label="Phone-Number" variant='filled'/>    
    <FormControl style={{marginTop:12}}>
        <FormLabel id="demo-radio-buttons-group-label">
            Gender
        </FormLabel>
        <RadioGroup
            error={errorData.gender?true:false}
            helperText={errorData.gender}
            name='gender'
            value={data.gender} 
            onChange={handleChange}
            aria-labelledby="demo-radio-buttons-group-label"
        >
                <FormControlLabel value='female' control={<Radio/>} label="Female"/>
                <FormControlLabel value='male' control={<Radio/>} label="Male"/>
                <FormControlLabel value='other' control={<Radio/>} label="Other"/>
        </RadioGroup>
    </FormControl> 
    <div style={{marginTop:12}}>
        <button
        onClick={save} variant="contained">Submit</button>
        <button variant="contained">Reset</button>
    </div>   
    </div>
  )
}

export default Form
