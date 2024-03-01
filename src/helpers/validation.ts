import Joi from "joi"

const idSchema = Joi.object({ id: Joi.string().required().regex(new RegExp("^[a-zA-Z0-9]+$")) });
export const validateId = (id: string) => idSchema.validate({ id });

const authenticationSchema = {
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    register: Joi.object({
        username: Joi.string().regex(new RegExp("^[a-zA-Z0-9_]{1,20}$")),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    update: Joi.object({
        username: Joi.string().regex(new RegExp("^[a-zA-Z0-9_]{1,20}$")),
        email: Joi.string().email(),
        password: Joi.string()
    })
}
//Auth Validations
export const validateLogin = (values: Record<string, any>) => authenticationSchema.login.validate(values)
export const validateRegister = (values: Record<string, any>) => authenticationSchema.register.validate(values)
export const validateUserUpdate = (values: Record<string, any>) => authenticationSchema.update.validate(values)
//Posts Validations
const postSchema = {
    post: Joi.object({
        title: Joi.string().regex(new RegExp("^[a-zA-Z0-9_. ]{1,35}$")).required(),
        content: Joi.string().regex(new RegExp("^[a-zA-Z0-9_. ]{1,1000}$")).required(),
        image: Joi.string().regex(new RegExp("^[a-zA-Z0-9.]{1,25}$")),
    })
}
export const validatePostsInputs = (values: Record<string, any>) => postSchema.post.validate(values);
//Comments Validations

const commentSchema = Joi.object({ content: Joi.string().required().regex(new RegExp("^[a-zA-Z0-9_. ]{1,200}$")) })
export const validateComment = (values: Record<string, any>) => commentSchema.validate(values);

const categorySchema = Joi.object({ name: Joi.string().required().regex(new RegExp("^[a-zA-Z0-9 ]{1,30}$")) })
export const validateCategory = (values: Record<string, any>) => categorySchema.validate(values);