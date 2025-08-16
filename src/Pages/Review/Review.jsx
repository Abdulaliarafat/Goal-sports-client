import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
    {
        id: 1,
        name: "Rahim Uddin",
        role: "Member, Goal Club",
        review:
            "The booking system is super easy to use. I can book courts in seconds!",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        id: 2,
        name: "Karim Ahmed",
        role: "Regular Player",
        review:
            "I love how smooth the payment process is. Goal makes everything simple.",
        rating: 4,
        img: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
        id: 3,
        name: "Shakil Hasan",
        role: "Badminton Enthusiast",
        review:
            "Courts are well maintained and easy to book. Great job by the Goal team!",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        id: 4,
        name: "Tanvir Alam",
        role: "Football Lover",
        review:
            "I enjoy the membership system, it feels professional and trustworthy.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
        id: 5,
        name: "Mehedi Hasan",
        role: "Student Player",
        review:
            "Affordable pricing and flexible booking slots. Highly recommended!",
        rating: 4,
        img: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        id: 6,
        name: "Nayeem Chowdhury",
        role: "Club Member",
        review:
            "Customer support is really helpful, they solved my issue in minutes.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
        id: 7,
        name: "Asif Mahmud",
        role: "Cricket Player",
        review:
            "Goal has made managing sports activities so much easier for us.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
        id: 8,
        name: "Zahidul Islam",
        role: "Coach",
        review:
            "The announcements feature keeps me updated on upcoming events.",
        rating: 4,
        img: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
        id: 9,
        name: "Sabbir Rahman",
        role: "Football Player",
        review:
            "Really love the design of the website. It's modern and easy to navigate.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
        id: 10,
        name: "Aminul Hoque",
        role: "Regular User",
        review:
            "Booking slots are always accurate and I never face double booking issues.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
        id: 11,
        name: "Imran Hossain",
        role: "Fitness Enthusiast",
        review:
            "The coupon system is amazing! Saved me money while booking courts.",
        rating: 4,
        img: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
        id: 12,
        name: "Rafiqul Islam",
        role: "Badminton Player",
        review:
            "Very easy to manage my bookings and payments all in one place.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
        id: 13,
        name: "Mizanur Rahman",
        role: "Tennis Player",
        review:
            "Mobile responsive design is great. I can book anytime on my phone.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
        id: 14,
        name: "Faruk Hossain",
        role: "Club Member",
        review:
            "I trust Goal with my payments and bookings, very secure platform.",
        rating: 4,
        img: "https://randomuser.me/api/portraits/men/14.jpg",
    },
    {
        id: 15,
        name: "Habib Ullah",
        role: "Cricket Lover",
        review:
            "A perfect solution for sports lovers. Goal is my go-to booking system.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/15.jpg",
    },
];

const Reviews = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-10 text-center">
                    What Our Members Say
                </h2>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                    {reviews.map(({ id, name, role, review, rating, img }) => (
                        <div
                            key={id}
                            className="p-6 rounded-2xl shadow-md bg-white hover:shadow-lg transition"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={img}
                                    alt={name}
                                    className="w-14 h-14 rounded-full border-2 border-indigo-500"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">{name}</h3>
                                    <p className="text-sm text-gray-500">{role}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">{review}</p>
                            <div className="flex text-yellow-500">
                                {[...Array(rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
