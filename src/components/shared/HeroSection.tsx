import React from "react"
import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import Image from "next/image"

interface ImageLink {
  href: string
  src: string
  alt: string
  width: number
  height: number
}

interface HeroSectionProps {
  headline: string
  subheadLine: string
  primaryBtnText: string
  primaryBtnLink: string
  secondaryBtnText: string
  secondaryBtnLink: string
  alertText: string
  alertLink: string
  alertBadge: string
  popularText: string
  images: ImageLink[]
}

export default function HeroSection({
  headline,
  subheadLine,
  primaryBtnText,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnLink,
  alertText,
  alertLink,
  alertBadge,
  popularText,
  images,
}: HeroSectionProps) {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <Link
          href={alertLink}
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          role="alert"
        >
          <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">{alertBadge}</span>{" "}
          <span className="text-sm font-medium">{alertText}</span>
          <ArrowRightIcon className="ml-2 w-5 h-5" />
        </Link>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{headline}</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{subheadLine}</p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            href={primaryBtnLink}
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-600 dark:text-gray-400 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            {primaryBtnText}
            <ArrowRightIcon className="ml-2 -mr-1 w-5 h-5" />
          </Link>
          <Link
            href={secondaryBtnLink}
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <PlayIcon className="mr-2 -ml-1 w-5 h-5" />
            {secondaryBtnText}
          </Link>
        </div>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <span className="font-semibold text-gray-600 dark:text-gray-400 uppercase">{popularText}</span>
          <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
            {images.map((image, index) => (
              <Link
                key={index}
                href={image.href}
                className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
              >
                <Image
                  src={image.src}
                  className="rounded-full"
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
