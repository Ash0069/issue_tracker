'use client';

import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

// Dynamically import SimpleMDE to disable SSR
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
    resolver : zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');
  const [ isSubmitting, setSubmitted ] = useState(false);

  return (
    <div className='max-w-xl'>
      {error && 
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
      <form 
        className='space-y-3' 
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitted(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setSubmitted(false);
            setError('An unexpected error occured');
          }
        })}>
          <TextField.Root placeholder="Title" {...register('title')}>
          </TextField.Root>
          <ErrorMessage>
            {errors.title?.message}
          </ErrorMessage>
          <Controller
            name = 'description'
            control = {control}
            render={({ field }) => 
              <SimpleMDE placeholder="Description" {...field} />
            } 
          />
          <ErrorMessage>
            {errors.description?.message}
          </ErrorMessage>
          <Button disabled={ isSubmitting }>
            Submit New Issue{isSubmitting && <Spinner />}
          </Button>
      </form>
    </div>
  )
};

export default NewIssuePage;