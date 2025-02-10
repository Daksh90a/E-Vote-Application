import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Loader2, Briefcase, DollarSign, MapPin, Clock, Award, Users, Building } from 'lucide-react'

import Navbar from '../shared/Navbar'
import { JOB_API_END_POINT } from '@/utils/constant'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({...input, companyId: selectedCompany._id});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
            <Navbar />
            <motion.div 
                className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        <CardTitle className="text-2xl font-extrabold flex items-center">
                            <Briefcase className="mr-2" />
                            Post a New Job
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={submitHandler} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Job Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={input.title}
                                        onChange={changeEventHandler}
                                        className="border-2 border-purple-300 focus:border-purple-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        className="border-2 border-purple-300 focus:border-purple-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="requirements">Requirements</Label>
                                    <Textarea
                                        id="requirements"
                                        name="requirements"
                                        value={input.requirements}
                                        onChange={changeEventHandler}
                                        className="border-2 border-purple-300 focus:border-purple-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="salary">Salary</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="salary"
                                            name="salary"
                                            value={input.salary}
                                            onChange={changeEventHandler}
                                            className="pl-10 border-2 border-purple-300 focus:border-purple-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="location"
                                            name="location"
                                            value={input.location}
                                            onChange={changeEventHandler}
                                            className="pl-10 border-2 border-purple-300 focus:border-purple-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="jobType">Job Type</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="jobType"
                                            name="jobType"
                                            value={input.jobType}
                                            onChange={changeEventHandler}
                                            className="pl-10 border-2 border-purple-300 focus:border-purple-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="experience">Experience</Label>
                                    <div className="relative">
                                        <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="experience"
                                            name="experience"
                                            value={input.experience}
                                            onChange={changeEventHandler}
                                            className="pl-10 border-2 border-purple-300 focus:border-purple-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="position">No. of Positions</Label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="position"
                                            name="position"
                                            type="number"
                                            value={input.position}
                                            onChange={changeEventHandler}
                                            className="pl-10 border-2 border-purple-300 focus:border-purple-500"
                                        />
                                    </div>
                                </div>

                                {companies.length > 0 && (
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Company</Label>
                                        <Select onValueChange={selectChangeHandler}>
                                            <SelectTrigger className="border-2 border-purple-300 focus:border-purple-500">
                                                <SelectValue placeholder="Select a Company" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {companies.map((company) => (
                                                    <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                        <div className="flex items-center">
                                                            <Building className="mr-2 h-4 w-4" />
                                                            {company.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                disabled={loading || companies.length === 0}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Posting Job...
                                    </>
                                ) : 'Post New Job'}
                            </Button>

                            {companies.length === 0 && (
                                <p className="text-sm text-red-600 font-medium text-center mt-2">
                                    Please register a company first before posting a job.
                                </p>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default PostJob

