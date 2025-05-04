/**
 * skenario test
 *
 * - asyncPopulateUsersAndTalks thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import api from "../../utils/api";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { asyncPopulateUsersAndTalks } from "./action";
import { receiveTalksActionCreator } from "../talks/action";
import { receiveUsersActionCreator } from "../users/action";

const fakeTalkResponse = [
  {
    id: "talk-1",
    text: "Talk Test 1",
    user: "user-1",
    replyTo: "",
    likes: [],
    createdAt: "2022-09-22T10:06:55.588Z",
  },
];

const fakeUsersResponse = [
  {
    id: "user-1",
    name: "User Test 1",
    photo: "https://generated-image-url.jpg",
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe("asyncPopulateUsersAndTalks thunk", () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllTalks = api.getAllTalks;
  });

  afterEach(() => {
    delete api._getAllUsers;
    delete api._getAllTalks;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllTalks = () => Promise.resolve(fakeTalkResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndTalks()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveTalksActionCreator(fakeTalkResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call alert correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllTalks = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock alert
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndTalks()(dispatch);

    // expect
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
