import React from 'react';
import { Helmet } from 'react-helmet-async';

const FAQ = () => {
    return (
        <section className="bg-base-100 ">
            <Helmet><title>Recycle It - FAQ</title></Helmet>
            <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                <h2 className="text-2xl font-semibold sm:text-4xl">Frequently Asked Questions</h2>
                <p className="mt-4 mb-8">Assignment 12 question-answer</p>
                <div className="space-y-4">
                    <details className="w-full border border-neutral rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">Q1. What are the different ways to manage a state in a React application?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">When we talk about state in our applications, it’s important to be clear about what types of state actually matter. There are four main types of state you need to properly manage in your React apps: Local state, Global state, Server state and URL state. </p>

                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Local state is perhaps the easiest kind of state to manage in React, considering there are so many tools built into the core React library for managing it. useState is the first tool you should reach for to manage state in your components.</p>

                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">useReducer is another option that can be used for either local or global state. It is similar in many ways to useState under the hood, although instead of just an initial state it accepts a reducer.</p>

                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">The benefit of useReducer is that it provides a built-in way to perform a number of different state operations with the help of the reducer function, which makes it more dynamic overall than useState.</p>
                    </details>


                    <details className="w-full border border-neutral rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">Q2. How does prototypical inheritance work?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
                    </details>


                    <details className="w-full border border-neutral rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">Q3. What is a unit test? Why should we write unit tests?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff.  The main objective of unit testing is to isolate written code to test and determine if it works as intended.Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                    </details>
                    <details className="w-full border border-neutral rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">Q4. React vs. Angular vs. Vue?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">If the choice you’re making is based on Angular vs React alone, then you’ll simply need to consider the pros and cons discussed for those libraries in this post. But overall, keep in mind that both libraries can be used for mobile and web apps, while Angular is generally better for more complex apps that are enterprise-ready. React often requires extra modules and components, which keeps the core library small, but means there’s extra work involved when incorporating outside tools. Angular, on the other hand, is more of a full-fledged solution that doesn’t require extras like React often does, though it does have a steeper learning curve for its core compared to React. React is more suitable for intermediate to advanced JavaScript developers who are familiar with concepts from ES6 and up, while Angular favors those same developers who are also familiar with TypeScript.</p>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">The choice between React vs Vue is often debated and it’s not an easy one. Vue has a vibrant and ever-growing community and has taken over popularity vs. React in many respects. React developers are still churning out lots of new components and extras, so there’s no sign that React is on the decline either. Vue is generally more suited to smaller, less complex apps and is easier to learn from scratch compared to React. Vue can be easier to integrate into new or existing projects and many feel its use of HTML templates along with JSX is an advantage. Overall, Vue might be the best choice if you’re a newer developer and not as familiar with advanced JavaScript concepts, while React is quite well suited for experienced programmers and developers who have worked with object-oriented JavaScript, functional JavaScript, and similar concepts.</p>
                    </details>
                </div>
            </div>
        </section>
    );
};

export default FAQ;