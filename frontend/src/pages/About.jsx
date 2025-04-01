import React from 'react';
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewLetterBox from '../components/NewsletterBox'

const About = () => {
    return (
        <div>
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={''} text2={'FOREVER'}></Title>
            </div>

            <div className='my-10 text-justify flex flex-col md:flex-row gap-16'>
                <img className='w-full md:max-w-[450px]' src={assets.about_img} alt='' />

                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Forever ra đời từ niềm đam mê đổi mới và mong muốn cách mạng hóa cách mọi người mua sắm trực tuyến. Hành trình của chúng tôi bắt đầu với một ý tưởng đơn giản:
                        cung cấp một nền tảng nơi khách hàng có thể dễ dàng khám phá, tìm hiểu và mua nhiều loại sản phẩm ngay tại nhà.</p>

                    <p>Kể từ khi thành lập, chúng tôi đã làm việc không biết mệt mỏi để tuyển chọn nhiều loại sản phẩm chất lượng cao đáp ứng mọi sở thích và nhu cầu. Từ thời trang và làm đẹp đến đồ điện tử và đồ gia dụng thiết yếu,
                        chúng tôi cung cấp một bộ sưu tập phong phú có nguồn gốc từ các thương hiệu và nhà cung cấp đáng tin cậy.</p>

                    <b className='mt-2 text-gray-800'>Sứ mệnh của Forever</b>

                    <p>Sứ mệnh của chúng tôi tại Forever là trao quyền cho khách hàng với sự lựa chọn, tiện lợi và sự tự tin.
                        Chúng tôi cam kết cung cấp trải nghiệm mua sắm liền mạch vượt quá mong đợi, từ việc duyệt và đặt hàng đến giao hàng và hơn thế nữa.</p>
                </div>
            </div>

            <div className='text-x py-4'>
                <Title text1={'WHY '} text2={' CHOOSE US ?'}></Title>
            </div>

            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Đảm bảo về chất lượng:</b>
                    <p className='text-justify text-gray-600'>Chúng tôi tỉ mỉ lựa chọn và kiểm tra từng sản phẩm để đảm bảo sản phẩm đáp ứng các tiêu chuẩn chất lượng nghiêm ngặt của chúng tôi.</p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Tiện lợi hàng đầu:</b>
                    <p className='text-justify text-gray-600'>Với giao diện thân thiện với người dùng và quy trình đặt hàng không rắc rối, mua sắm chưa bao giờ dễ dàng đến thế.</p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Hỗ trợ khách hàng tận tâm:</b>
                    <p className='text-justify text-gray-600'>Đội ngũ chuyên gia tận tụy của chúng tôi luôn sẵn sàng hỗ trợ bạn, đảm bảo sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi.</p>
                </div>
            </div>

            <NewLetterBox />
        </div >
    );
};

export default About;

