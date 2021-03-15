import React from 'react';
import { Input, Form, Button } from '@features/auth/base/components';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
const { FormItem } = Form;

const ChangePasswordValidationSchema = Yup.object().shape({
  oldpassword: Yup.string()
    .min(6, 'Mật khẩu có ít nhất 6 ký tự')
    .required('Trường mật khẩu cũ không thể bỏ trống'),
  password: Yup.string()
    .min(6, 'Mật khẩu có ít nhất 6 ký tự')
    .notOneOf([Yup.ref('oldpassword')], 'Mật khẩu mới phải khác mật khẩu cũ')
    .required('Trường mật khẩu không thể bỏ trống'),
  repassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Mật khẩu không khớp'
  ),
});

function ChangePassword() {
  const { handleSubmit, control, errors } = useForm({
    validationSchema: ChangePasswordValidationSchema,
  });
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className="content-panel">
      <h1 className="title mb-5">Thay đổi mật khẩu</h1>
      <form
        className="form-horizontal"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <fieldset className="fieldset">
          <div className="form-group">
            <div className="col-md-10 col-sm-9 col-xs-12 mb-5">
              <FormItem
                as={<Input.Password />}
                label="Mật khẩu cũ"
                name="oldpassword"
                control={control}
                error={errors.oldpassword?.message}
                defaultValue=""
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-10 col-sm-9 col-xs-12 mb-5">
              <FormItem
                as={<Input.Password />}
                label="Mật khẩu mới"
                name="password"
                control={control}
                error={errors.password?.message}
                defaultValue=""
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-10 col-sm-9 col-xs-12 mb-5">
              <FormItem
                as={<Input.Password />}
                label="Nhập lại mật khẩu mới"
                name="repassword"
                control={control}
                error={errors.repassword?.message}
                defaultValue=""
              />
            </div>
          </div>
        </fieldset>
        <hr />
        <div className="form-group">
          <div className="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
            <Button htmlType="submit">Cập nhật</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
