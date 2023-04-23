const FORMAT = {

  // used in forms
  testButton: (color) => {

    // return (`data-te-ripple-init="true"`)

  //   return({one:`data-te-ripple-init="true"`,
  // two:`data-te-ripple-color="light"`})

    // return (`className=data-te-ripple-init data-te-ripple-color="light" className="disabled:cursor-not-allowed inline-block rounded disabled:bg-gray-500 enabled:bg-primary px-6 pb-2 pt-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out enabled:hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"`)

    // return (`bg-${color}`)

    // return (`inline-block rounded-full border-2 border-${color} px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-${color} transition duration-150 ease-in-out hover:border-${color}-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-${color}-600 focus:border-${color}-600 focus:text-${color}-600 focus:outline-none focus:ring-0 active:border-${color}-700 active:text-${color}-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10`)
    return (`inline-block rounded-full border-2 border-${color} px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-${color} transition duration-150 ease-in-out hover:border-${color}-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-${color}-600 focus:border-${color}-600 focus:text-${color}-600 focus:outline-none focus:ring-0 active:border-${color}-700 active:text-${color}-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10`)

  },

  button: (color) => {
    /* add to attributes
    data-te-ripple-init="true"
    data-te-ripple-color="light"
    */
    return (`disabled:cursor-not-allowed inline-block rounded disabled:bg-gray-500 enabled:bg-${color} px-6 pb-2 pt-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out enabled:hover:bg-${color}-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-${color}-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-${color}-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`);
  },
  input: () => {
    return (`peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0`)
  },
  inputLabel: () => {
    return (`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`)
  },
  spanBlock: () => {
    return(`flex items-center whitespace-nowrap rounded-r border border-solid border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200`)
  }
};

export default FORMAT;
