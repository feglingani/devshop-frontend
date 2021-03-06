import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { useMutation, useQuery } from '../../lib/graphql';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Input from '../../components/Input';

const CREATE_CATEGORY = `
		mutation createCategory($name: String!, $slug: String!) {
			createCategory (input: {
        name: $name,
        slug: $slug
      }) {
				id
				name
				slug
			}
		}
	`;

const Index = () => {
  const router = useRouter();
  const [data, createCategory] = useMutation(CREATE_CATEGORY);
  const form = useFormik({
    initialValues: {
      name: '',
      slug: ''
    },
    onSubmit: async values => {
      await createCategory(values);
      router.push('/categories');
      //console.log(values);
    }
  });
  return (
    <Layout>
      <Title>Criar Categorias</Title>
      <div className='mt-8'></div>

      <Button.LinkOutline href='/categories'>Voltar</Button.LinkOutline>

      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='align-middle inline-block min-w-full bg-white shadow overflow-hidden sm:rounded-lg border-b border-gray-200 p-12'>
            {data && !!data.errors && (
              <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative'>
                Ocorreu um erro ao salvar os dados.
              </p>
            )}
            <form onSubmit={form.handleSubmit}>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <Input
                  label='Nome da categoria'
                  placeholder='Preencha com o nome da categoria'
                  value={form.values.name}
                  onChange={form.handleChange}
                  name='name'
                  errorMessage={form.errors.name}
                />

                <Input
                  label='Slug da categoria'
                  placeholder='Preencha com o slug da categoria'
                  value={form.values.slug}
                  onChange={form.handleChange}
                  name='slug'
                  helpText='Slug é utilizado para URLs amigáveis.'
                  errorMessage={form.errors.slug}
                />
              </div>
              <Button>Criar categoria</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
