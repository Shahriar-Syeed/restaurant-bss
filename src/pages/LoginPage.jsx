
import loginLeftImageSpinning from '../assets/login-left-image.png';
import loginLeftImageBackground from '../assets/login-left-image-2.png';
import '../style/login.css';
import LoginForm from '../components/login/LoginForm';

const LoginPage = () => {
  return (
    <section className="login">
      <div className="px-2">
        <div className="min-h-svh grid lg:grid-cols-2">
          <div className='lg:grid hidden place-items-center relative'>
              <img src={loginLeftImageBackground} alt="Abstract shape background" className='img absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3'  />
            <div className='w-1/2'>
              <img src={loginLeftImageSpinning} alt="Image of foods and spinning" className=' w-full animate-spin animation-duration-20000 relative z-10' />
            </div>
          </div>
          <div className='login__right grid place-items-center lg:w-auto sm:w-11/12 w-full'>
            <LoginForm/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage;