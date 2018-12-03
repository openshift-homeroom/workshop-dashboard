---
Title: Introduction
---

This guide is to help you get started with using the terminal workspace
and dashboard images, and combine them with a JupyterHub based spawner, to run workshops using OpenShift. These can be used together in a variety of ways depending on your requirements.

Examples of how the images and spawner can be used include:

* Deploy a standalone terminal workspace to a project in OpenShift. This provides an interactive terminal, in your browser, running inside of a container in OpenShift. The image is pre-populated with the Kubernetes ``kubectl`` client, the OpenShift ``oc`` and ``odo`` clients, as well as language developer tools for Java, Node.js and Python. For personal learning, or in a workshop setting, this avoids the need for you to install any developer tools on your own computer.

* Using the terminal workspace image as a base, create a custom image which includes any additional tools or source files required for a workshop.

* Using the terminal dashboard image as a base, create a custom image which includes the workshop instructions that users need to follow. The same image can also include any additional tools or source files required for a workshop.

* Using JupyterHub to manage users you can spawn separate sessions, using either the terminal workspace or dashboard images, for each user in a workshop setting. Users can be restricted to existing users of the OpenShift cluster, or JupyterHub can be configured to use a separate authentication provider such as KeyCloak. Anonymous users can also be allowed if required, with ephemeral access provided by way of using service accounts and temporary projects.
